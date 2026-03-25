# FinOps Study Solver

브라우저에서만 동작하는 정적 웹앱입니다.

링크: https://pokingteemo.github.io/finops-study-solver/

목표는 다음 입력을 받아 FinOps Study 제출 형식에 맞는 초안과 GPT 프롬프트를 만드는 것입니다.

- 회사 정보
- 배경 설명
- `main.tf`
- `metrics.json`
- `cost_report.json`

## 핵심 특징

- 서버 없음
- 데이터베이스 없음
- 브라우저 로컬 분석
- GitHub Pages 무료 배포 가능
- 현재는 GPT 호출 비용을 제외한 추가 인프라 비용 0원 구성
- `analysis.md`, `optimized-main.tf`, `report.md`, `prompt.txt` 다운로드 지원

## 추천 운영 구조

1. 사용자가 웹페이지에서 회사 정보와 배경을 입력
2. `main.tf`, `metrics.json`, `cost_report.json` 업로드
3. 브라우저가 Terraform / Metrics / Cost Report를 로컬에서 파싱
4. 휴리스틱 규칙으로 1차 비용 낭비 후보를 식별
5. 제출 양식에 맞는 분석 초안과 GPT 프롬프트를 생성
6. 사용자는 프롬프트를 ChatGPT에 붙여 넣어 최종 답안을 생성
7. 결과를 Issue 본문 또는 리포트 파일로 제출

## 현재 로직

### Terraform 분석
- `aws_instance`
- `aws_ebs_volume`
- 인스턴스 타입, 볼륨 크기, 볼륨 타입, 태그, 리전 추출

### Metrics 분석
다음과 같은 형태를 최대한 유연하게 지원합니다.

- `[{ resource, metric, values }]`
- `{ metrics: [...] }`
- `{ data: [...] }`
- `{ resources: { resourceName: { metricName: [...] } } }`

### Cost Report 분석
다음과 같은 형태를 최대한 유연하게 지원합니다.

- `[{ month, total, waste }]`
- `{ monthly: [...] }`
- `{ data: [...] }`

### 휴리스틱 규칙
- 중지된 인스턴스에 연결된 것으로 보이는 EBS 볼륨 탐지
- read/write ops가 0에 가까운 EBS 볼륨 탐지
- 낮은 CPU 사용률의 과대 프로비저닝 EC2 탐지
- `gp2 -> gp3` 전환 후보 탐지
- 비용 리포트 평균 낭비 비용을 절감액 앵커로 사용

## 현재 QuickMart 예시에서 기대하는 해석

- 500GB `gp2` EBS 3개가 `stopped_instance` 태그를 보유
- 해당 볼륨들은 사실상 유휴 상태 후보
- 평균 낭비 비용이 약 `$151.46`
- 제출용 예상 절감액은 보수적으로 `$150/month` 수준 제안 가능

## 배포 방법 1: GitHub Pages

### 1) 저장소 생성
예: `finops-study-solver`

### 2) 파일 업로드
이 디렉토리의 파일을 그대로 커밋

### 3) GitHub Pages 활성화
- `Settings`
- `Pages`
- `GitHub Actions` 선택

### 4) 배포
기본 포함된 `.github/workflows/pages.yml` 이 자동 배포

## 배포 방법 2: 로컬 실행
서버 없이도 단순 정적 파일이므로 아래처럼 열 수 있습니다.

### Python
```bash
python -m http.server 8080
```

그 후 브라우저에서 `http://localhost:8080` 접속

## 향후 확장 포인트

### 1. 완전 자동 GPT 연동
현재는 프롬프트 복사 방식입니다.

이유:
- 브라우저에 OpenAI API Key를 직접 넣으면 키가 노출될 수 있음
- 무비용 운영을 위해 서버를 두지 않았음

### 2. 규칙 엔진 확장
- ALB/NAT Gateway/S3/CloudFront/RDS/EIP 등 추가
- 스케줄링 가능한 dev/test 종료 정책
- 태그 누락 탐지
- 리전별 가격 카탈로그 JSON

### 3. 정답 품질 향상
- 제출 이력 축적
- 정답/오답 패턴 기반 few-shot 프롬프트
- 시나리오 난이도별 규칙 가중치 조정

## 디렉토리 구조

```text
finops-study-solver/
├─ index.html
├─ styles.css
├─ app.js
├─ README.md
└─ .github/
   └─ workflows/
      └─ pages.yml
```

## 주의

이 도구의 절감액 계산은 1차 휴리스틱입니다.
최종 제출 전에는 반드시 아래를 확인해야 합니다.

- 실제 운영 리소스 의존성
- 백업/보존 정책
- 최근 배포/이벤트 일정
- 성능 검증 결과

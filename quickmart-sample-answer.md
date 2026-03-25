## Analysis

### Week
2

### Scenario ID
L1-001

### Problem Identification
- 사용되지 않는 EBS 볼륨 3개(ebs-volume-ly10d7, ebs-volume-g1rhjf, ebs-volume-wcp38l)가 비용을 발생시키고 있습니다.
- 세 볼륨 모두 500GB gp2이며, AttachedTo 태그가 stopped_instance로 표시되어 있습니다.
- 메트릭상 read/write 활동이 거의 없거나 0에 가까워 유휴 스토리지 가능성이 높습니다.

### Root Cause
- 중지된 인스턴스에 연결되었거나 이미 분리된 볼륨이 정리되지 않아 지속적으로 스토리지 비용이 청구되고 있습니다.
- 비용 리포트 기준 최근 6개월 평균 낭비 비용은 약 $151.46로 반복적인 유휴 리소스 낭비가 존재합니다.
- FinOps 전담팀이 없고, 리소스 lifecycle 관리 기준이 약해 삭제/스냅샷 전환 프로세스가 운영되지 않은 것으로 보입니다.

### Proposed Solution
- ebs-volume-ly10d7, ebs-volume-g1rhjf, ebs-volume-wcp38l의 실제 사용 여부를 오너에게 확인합니다.
- 보존 목적이 없으면 즉시 삭제합니다.
- 데이터 보존이 필요하면 스냅샷 생성 후 볼륨을 삭제합니다.
- 향후 재발 방지를 위해 owner, environment, ttl 태그를 강제하고, 월 1회 유휴 EBS 점검 자동화를 추가합니다.

### Estimated Monthly Savings (USD)
150

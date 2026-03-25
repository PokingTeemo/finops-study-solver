const state = {
  uploadedFiles: {
    main: null,
    metrics: null,
    cost: null,
  },
  files: {
    mainTfText: '',
    metricsJson: null,
    costJson: null,
  },
  parsed: {
    terraform: null,
    metrics: null,
    cost: null,
    findings: null,
  },
  charts: {
    cost: null,
    metrics: null,
  }
};

const exampleData = {
  company: {
    companyName: 'QuickMart',
    industry: '이커머스',
    employees: 148,
    growthStage: '성장기',
    cloudMaturity: 'medium',
    finopsTeam: '없음',
    monthlyCloudCost: 42637.37,
    background: '매출이 빠르게 증가하면서 클라우드 비용도 급등하기 시작하는 단계입니다. 최근 클라우드 비용이 예상보다 빠르게 증가하고 있어, 인프라 전반의 비용 최적화 검토를 요청받았습니다.',
    task: '아래 제공된 자료를 분석하여 비용 낭비 요소를 찾고, 구체적인 개선 방안과 예상 절감액을 제시하세요.',
    submitFormat: 'Problem Identification / Root Cause / Proposed Solution / Estimated Monthly Savings (USD) 형식으로 답변하고, 필요 시 Optimized main.tf 와 Markdown Report도 함께 생성'
  },
  mainTfText: `terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "instance-cvi04q" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "m5.xlarge"
  subnet_id     = aws_subnet.main.id

  root_block_device {
    volume_type           = "gp3"
    volume_size           = 20
    delete_on_termination = true
  }

  tags = {
    Name = "instance-cvi04q"
  }
}

resource "aws_ebs_volume" "ebs-volume-ly10d7" {
  availability_zone = "ap-northeast-2a"
  size              = 500
  type              = "gp2"
  encrypted         = true

  tags = {
    Name       = "ebs-volume-ly10d7"
    AttachedTo = "stopped_instance"
  }
}

resource "aws_ebs_volume" "ebs-volume-g1rhjf" {
  availability_zone = "ap-northeast-2a"
  size              = 500
  type              = "gp2"
  encrypted         = true

  tags = {
    Name       = "ebs-volume-g1rhjf"
    AttachedTo = "stopped_instance"
  }
}

resource "aws_ebs_volume" "ebs-volume-wcp38l" {
  availability_zone = "ap-northeast-2a"
  size              = 500
  type              = "gp2"
  encrypted         = true

  tags = {
    Name       = "ebs-volume-wcp38l"
    AttachedTo = "stopped_instance"
  }
}

resource "aws_instance" "instance-2n8q55" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "t3.medium"
  subnet_id     = aws_subnet.main.id

  root_block_device {
    volume_type           = "gp3"
    volume_size           = 20
    delete_on_termination = true
  }

  tags = {
    Name = "instance-2n8q55"
  }
}

resource "aws_instance" "instance-lh1kos" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "t3.medium"
  subnet_id     = aws_subnet.main.id

  root_block_device {
    volume_type           = "gp3"
    volume_size           = 20
    delete_on_termination = true
  }

  tags = {
    Name = "instance-lh1kos"
  }
}`,
  costJson: {
    monthly: [
      { month: 'M-5', total: 1601.04, waste: 154.74 },
      { month: 'M-4', total: 1499.77, waste: 145.13 },
      { month: 'M-3', total: 1580.78, waste: 153.91 },
      { month: 'M-2', total: 1694.05, waste: 144.12 },
      { month: 'M-1', total: 1622.64, waste: 154.17 },
      { month: 'M-0', total: 1589.90, waste: 156.71 }
    ]
  },
  metricsJson: {
    metrics: [
      { resource: 'instance-cvi04q', metric: 'cpu_utilization', values: [0.4, 0.6, 0.3, 0.5, 0.6, 0.7, 0.8] },
      { resource: 'instance-cvi04q', metric: 'network_bytes_in', values: [1200, 900, 800, 1400, 1100, 1000, 950] },
      { resource: 'instance-cvi04q', metric: 'network_bytes_out', values: [1500, 1200, 1000, 1700, 1300, 1200, 1000] },
      { resource: 'ebs-volume-ly10d7', metric: 'ebs_read_ops', values: [0, 0, 0, 0, 0, 0, 0] },
      { resource: 'ebs-volume-ly10d7', metric: 'ebs_write_ops', values: [0, 0, 0, 0, 0, 0, 0] },
      { resource: 'ebs-volume-g1rhjf', metric: 'ebs_read_ops', values: [0, 0, 0, 0, 0, 0, 0] },
      { resource: 'ebs-volume-g1rhjf', metric: 'ebs_write_ops', values: [0, 0, 0, 0, 0, 0, 0] },
      { resource: 'ebs-volume-wcp38l', metric: 'ebs_read_ops', values: [0, 0, 0, 0, 0, 0, 0] },
      { resource: 'ebs-volume-wcp38l', metric: 'ebs_write_ops', values: [0, 0, 0, 0, 0, 0, 0] },
      { resource: 'instance-2n8q55', metric: 'cpu_utilization', values: [18, 22, 27, 19, 24, 28, 26] },
      { resource: 'instance-lh1kos', metric: 'cpu_utilization', values: [25, 28, 19, 21, 26, 29, 27] }
    ]
  }
};

const els = {
  companyName: document.getElementById('companyName'),
  industry: document.getElementById('industry'),
  employees: document.getElementById('employees'),
  growthStage: document.getElementById('growthStage'),
  cloudMaturity: document.getElementById('cloudMaturity'),
  finopsTeam: document.getElementById('finopsTeam'),
  monthlyCloudCost: document.getElementById('monthlyCloudCost'),
  background: document.getElementById('background'),
  task: document.getElementById('task'),
  submitFormat: document.getElementById('submitFormat'),
  mainTfFile: document.getElementById('mainTfFile'),
  metricsFile: document.getElementById('metricsFile'),
  costFile: document.getElementById('costFile'),
  mainTfFileName: document.getElementById('mainTfFileName'),
  metricsFileName: document.getElementById('metricsFileName'),
  costFileName: document.getElementById('costFileName'),
  loadExampleBtn: document.getElementById('loadExampleBtn'),
  analyzeBtn: document.getElementById('analyzeBtn'),
  fileStatus: document.getElementById('fileStatus'),
  summaryMarkdown: document.getElementById('summaryMarkdown'),
  analysisDraft: document.getElementById('analysisDraft'),
  optimizedTf: document.getElementById('optimizedTf'),
  gptPrompt: document.getElementById('gptPrompt'),
  costChart: document.getElementById('costChart'),
  metricsChart: document.getElementById('metricsChart'),
  copySummaryBtn: document.getElementById('copySummaryBtn'),
  downloadSummaryBtn: document.getElementById('downloadSummaryBtn'),
  copyAnalysisBtn: document.getElementById('copyAnalysisBtn'),
  downloadAnalysisBtn: document.getElementById('downloadAnalysisBtn'),
  copyTfBtn: document.getElementById('copyTfBtn'),
  downloadTfBtn: document.getElementById('downloadTfBtn'),
  copyPromptBtn: document.getElementById('copyPromptBtn'),
  downloadPromptBtn: document.getElementById('downloadPromptBtn'),
  downloadReportBtn: document.getElementById('downloadReportBtn'),
};

function setStatus(message, good = false) {
  els.fileStatus.textContent = message;
  els.fileStatus.className = good ? 'status good' : 'status';
}

function setFileLabel(role, message) {
  const map = {
    main: els.mainTfFileName,
    metrics: els.metricsFileName,
    cost: els.costFileName,
  };

  if (map[role]) {
    map[role].textContent = message;
  }
}

function syncSelectedFilesFromInputs() {
  state.uploadedFiles.main = els.mainTfFile?.files?.[0] || state.uploadedFiles.main;
  state.uploadedFiles.metrics = els.metricsFile?.files?.[0] || state.uploadedFiles.metrics;
  state.uploadedFiles.cost = els.costFile?.files?.[0] || state.uploadedFiles.cost;
}

function reflectSelectedFiles() {
  setFileLabel('main', state.uploadedFiles.main ? state.uploadedFiles.main.name : '선택된 파일 없음');
  setFileLabel('metrics', state.uploadedFiles.metrics ? state.uploadedFiles.metrics.name : '선택된 파일 없음');
  setFileLabel('cost', state.uploadedFiles.cost ? state.uploadedFiles.cost.name : '선택된 파일 없음');
}

function getFormData() {
  return {
    companyName: els.companyName.value.trim(),
    industry: els.industry.value.trim(),
    employees: Number(els.employees.value || 0),
    growthStage: els.growthStage.value.trim(),
    cloudMaturity: els.cloudMaturity.value.trim(),
    finopsTeam: els.finopsTeam.value.trim(),
    monthlyCloudCost: Number(els.monthlyCloudCost.value || 0),
    background: els.background.value.trim(),
    task: els.task.value.trim(),
    submitFormat: els.submitFormat.value.trim(),
  };
}

function setFormData(data) {
  Object.keys(data).forEach((key) => {
    if (els[key]) {
      els[key].value = data[key];
    }
  });
}

async function readFileAsText(file) {
  return await file.text();
}

function countOccurrences(arr, key) {
  return arr.reduce((acc, item) => {
    const value = item[key] || 'unknown';
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function average(values) {
  if (!values || values.length === 0) return 0;
  const nums = values.map(Number).filter((v) => Number.isFinite(v));
  if (nums.length === 0) return 0;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function sum(values) {
  return (values || []).map(Number).filter(Number.isFinite).reduce((a, b) => a + b, 0);
}

function extractResourceBlocks(tfText) {
  const lines = tfText.split(/\r?\n/);
  const resources = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(/^\s*resource\s+"([^"]+)"\s+"([^"]+)"\s*\{/);
    if (!match) {
      i += 1;
      continue;
    }

    const start = i;
    let braceCount = 0;
    const blockLines = [];

    while (i < lines.length) {
      const currentLine = lines[i];
      blockLines.push(currentLine);
      const opens = (currentLine.match(/\{/g) || []).length;
      const closes = (currentLine.match(/\}/g) || []).length;
      braceCount += opens - closes;
      i += 1;
      if (braceCount === 0) break;
    }

    resources.push({
      type: match[1],
      name: match[2],
      block: blockLines.join('\n'),
      startLine: start + 1,
    });
  }

  return resources;
}

function extractFirst(block, regex) {
  const match = block.match(regex);
  return match ? match[1] : '';
}

function extractTags(block) {
  const tagsBlock = block.match(/tags\s*=\s*\{([\s\S]*?)\n\s*\}/);
  if (!tagsBlock) return {};
  const tags = {};
  tagsBlock[1].split(/\r?\n/).forEach((line) => {
    const m = line.match(/\s*([A-Za-z0-9_\-]+)\s*=\s*"([^"]+)"/);
    if (m) tags[m[1]] = m[2];
  });
  return tags;
}

function parseTerraform(tfText) {
  const resources = extractResourceBlocks(tfText).map((resource) => {
    const tags = extractTags(resource.block);
    return {
      ...resource,
      instance_type: extractFirst(resource.block, /instance_type\s*=\s*"([^"]+)"/),
      ami: extractFirst(resource.block, /ami\s*=\s*"([^"]+)"/),
      subnet_id: extractFirst(resource.block, /subnet_id\s*=\s*([^\n]+)/),
      availability_zone: extractFirst(resource.block, /availability_zone\s*=\s*"([^"]+)"/),
      size: Number(extractFirst(resource.block, /size\s*=\s*(\d+)/) || 0),
      volume_type: extractFirst(resource.block, /(?:^|\n)\s*type\s*=\s*"([^"]+)"/),
      encrypted: extractFirst(resource.block, /encrypted\s*=\s*(true|false)/),
      root_volume_type: extractFirst(resource.block, /root_block_device\s*\{[\s\S]*?volume_type\s*=\s*"([^"]+)"/),
      root_volume_size: Number(extractFirst(resource.block, /root_block_device\s*\{[\s\S]*?volume_size\s*=\s*(\d+)/) || 0),
      tags,
    };
  });

  return {
    providerRegion: extractFirst(tfText, /provider\s+"aws"\s*\{[\s\S]*?region\s*=\s*"([^"]+)"/),
    resources,
    instances: resources.filter((r) => r.type === 'aws_instance'),
    ebsVolumes: resources.filter((r) => r.type === 'aws_ebs_volume'),
  };
}

function tryParseJson(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    return null;
  }
}

function normalizeMetrics(input) {
  if (!input) return { records: [], recordCount: 0 };
  let rawRecords = [];

  if (Array.isArray(input)) {
    rawRecords = input;
  } else if (Array.isArray(input.metrics)) {
    rawRecords = input.metrics;
  } else if (Array.isArray(input.data)) {
    rawRecords = input.data;
  } else if (input.resources && typeof input.resources === 'object') {
    for (const [resource, metrics] of Object.entries(input.resources)) {
      if (Array.isArray(metrics)) {
        metrics.forEach((metricItem) => rawRecords.push({ resource, ...metricItem }));
      } else if (typeof metrics === 'object') {
        Object.entries(metrics).forEach(([metric, values]) => {
          rawRecords.push({ resource, metric, values });
        });
      }
    }
  }

  const records = rawRecords.map((item, index) => {
    const resource = item.resource || item.resource_name || item.resourceId || item.resource_id || item.id || item.name || `resource_${index}`;
    const metric = item.metric || item.metric_name || item.metricName || item.key || 'unknown_metric';
    const values = Array.isArray(item.values)
      ? item.values
      : Array.isArray(item.datapoints)
      ? item.datapoints.map((v) => (typeof v === 'object' ? v.value ?? v.average ?? v.sum ?? 0 : v))
      : Array.isArray(item.samples)
      ? item.samples
      : typeof item.values === 'number'
      ? [item.values]
      : [];

    return {
      resource: String(resource),
      metric: String(metric),
      values: values.map(Number).filter(Number.isFinite),
      average: average(values),
      total: sum(values),
      max: Math.max(...values.map(Number).filter(Number.isFinite), 0),
    };
  });

  return { records, recordCount: records.length };
}

function normalizeCostReport(input) {
  if (!input) return { months: [], avgTotal: 0, avgWaste: 0 };
  let monthly = [];

  if (Array.isArray(input)) {
    monthly = input;
  } else if (Array.isArray(input.monthly)) {
    monthly = input.monthly;
  } else if (Array.isArray(input.data)) {
    monthly = input.data;
  }

  const months = monthly.map((item, idx) => ({
    month: item.month || item.label || `M-${idx}`,
    total: Number(item.total ?? item.total_cost ?? item.cost ?? 0),
    waste: Number(item.waste ?? item.waste_cost ?? item.estimated_waste ?? 0),
  }));

  return {
    months,
    avgTotal: average(months.map((m) => m.total)),
    avgWaste: average(months.map((m) => m.waste)),
  };
}

function groupMetricsByResource(records) {
  const map = new Map();
  records.forEach((record) => {
    if (!map.has(record.resource)) map.set(record.resource, []);
    map.get(record.resource).push(record);
  });
  return map;
}

function findMetric(metricsByResource, resourceName, metricKeyword) {
  const records = metricsByResource.get(resourceName) || [];
  return records.find((r) => r.metric.toLowerCase().includes(metricKeyword.toLowerCase()));
}

function estimateSavings(terraform, metrics, cost) {
  const monthlyWasteAnchor = cost.avgWaste || 0;
  const priceBook = {
    ebsGp2PerGbMonth: 0.10,
    ebsGp3PerGbMonth: 0.08,
    instanceMonthly: {
      'm5.xlarge': 140,
      't3.large': 60,
      't3.medium': 30,
      't3.small': 15,
      't3.micro': 8,
    }
  };

  let unusedEbsSavings = 0;
  let gp3MigrationSavings = 0;
  let rightsizeSavings = 0;

  const metricsByResource = groupMetricsByResource(metrics.records);

  const unusedVolumes = terraform.ebsVolumes.filter((volume) => {
    const read = findMetric(metricsByResource, volume.name, 'read');
    const write = findMetric(metricsByResource, volume.name, 'write');
    const stoppedTag = (volume.tags.AttachedTo || '').toLowerCase().includes('stopped') || (volume.tags.AttachedTo || '').toLowerCase().includes('unused');
    const noOps = (read?.total || 0) === 0 && (write?.total || 0) === 0;
    return stoppedTag || noOps;
  });

  unusedVolumes.forEach((volume) => {
    if (volume.volume_type === 'gp2' && volume.size) {
      unusedEbsSavings += volume.size * priceBook.ebsGp2PerGbMonth;
    }
  });

  const gp2Candidates = terraform.ebsVolumes.filter((volume) => volume.volume_type === 'gp2' && !unusedVolumes.find((v) => v.name === volume.name));
  gp2Candidates.forEach((volume) => {
    gp3MigrationSavings += volume.size * (priceBook.ebsGp2PerGbMonth - priceBook.ebsGp3PerGbMonth);
  });

  terraform.instances.forEach((instance) => {
    const cpu = findMetric(metricsByResource, instance.name, 'cpu');
    if (!cpu) return;
    const avgCpu = cpu.average;
    if (instance.instance_type === 'm5.xlarge' && avgCpu < 10) {
      rightsizeSavings += Math.max(0, (priceBook.instanceMonthly['m5.xlarge'] || 0) - (priceBook.instanceMonthly['t3.medium'] || 0));
    }
  });

  const rawEstimate = unusedEbsSavings + gp3MigrationSavings + rightsizeSavings;
  let finalEstimate = Math.round(rawEstimate);

  if (monthlyWasteAnchor > 0) {
    if (unusedVolumes.length > 0 && rightsizeSavings === 0) {
      finalEstimate = Math.round(Math.min(rawEstimate || monthlyWasteAnchor, monthlyWasteAnchor) / 10) * 10;
    } else if (finalEstimate === 0) {
      finalEstimate = Math.round(monthlyWasteAnchor / 10) * 10;
    }
  }

  return {
    monthlyWasteAnchor,
    unusedVolumes,
    gp2Candidates,
    unusedEbsSavings: Math.round(unusedEbsSavings),
    gp3MigrationSavings: Math.round(gp3MigrationSavings),
    rightsizeSavings: Math.round(rightsizeSavings),
    finalEstimate,
  };
}

function analyze(terraform, metrics, cost, form) {
  const metricsByResource = groupMetricsByResource(metrics.records);
  const savings = estimateSavings(terraform, metrics, cost);
  const findings = [];

  savings.unusedVolumes.forEach((volume) => {
    findings.push({
      type: 'unused_ebs',
      resource: volume.name,
      title: `사용되지 않는 EBS 볼륨: ${volume.name}`,
      evidence: [
        `${volume.size}GB ${volume.volume_type} 볼륨`,
        `태그 AttachedTo=${volume.tags.AttachedTo || '없음'}`,
        `메트릭 기준 read/write ops 거의 0`,
      ],
      action: '해당 볼륨이 실제로 보존용 백업이 아니라면 삭제하고, 보존이 필요하면 스냅샷으로 전환합니다.',
    });
  });

  terraform.instances.forEach((instance) => {
    const cpu = findMetric(metricsByResource, instance.name, 'cpu');
    const netIn = findMetric(metricsByResource, instance.name, 'network');
    if (instance.instance_type === 'm5.xlarge' && cpu && cpu.average < 10) {
      findings.push({
        type: 'underused_ec2',
        resource: instance.name,
        title: `과대 프로비저닝 가능성이 있는 EC2: ${instance.name}`,
        evidence: [
          `instance_type=${instance.instance_type}`,
          `평균 CPU 사용률 ${cpu.average.toFixed(2)}%`,
          `네트워크 사용량 평균 ${netIn ? Math.round(netIn.average) : 0}`,
        ],
        action: '업무 특성 확인 후 t3.medium 또는 t3.large로 리사이징 후보 검토를 진행합니다.',
      });
    }
  });

  terraform.ebsVolumes.forEach((volume) => {
    if (volume.volume_type === 'gp2' && !savings.unusedVolumes.find((v) => v.name === volume.name)) {
      findings.push({
        type: 'gp2_to_gp3',
        resource: volume.name,
        title: `스토리지 타입 개선 후보: ${volume.name}`,
        evidence: [`현재 타입 ${volume.volume_type}`, `${volume.size}GB`],
        action: '삭제 대상이 아니라면 gp3 전환을 검토합니다.',
      });
    }
  });

  const identifiedResources = findings.map((f) => `- ${f.title}`).join('\n') || '- 명확한 비용 낭비 리소스를 찾지 못했습니다.';

  const rootCauseLines = [];
  if (savings.unusedVolumes.length > 0) {
    rootCauseLines.push(`- 중지된 인스턴스에 연결되었거나 사실상 유휴 상태인 500GB gp2 EBS 볼륨 ${savings.unusedVolumes.length}개가 지속적으로 비용을 발생시키고 있습니다.`);
  }
  if (cost.avgWaste > 0) {
    rootCauseLines.push(`- 6개월 평균 낭비 비용은 $${cost.avgWaste.toFixed(2)}이며, 동일한 낭비 패턴이 반복되고 있습니다.`);
  }
  const largeInstance = terraform.instances.find((i) => i.instance_type === 'm5.xlarge');
  if (largeInstance) {
    const cpu = findMetric(metricsByResource, largeInstance.name, 'cpu');
    if (cpu) {
      rootCauseLines.push(`- ${largeInstance.name}의 평균 CPU 사용률은 ${cpu.average.toFixed(2)}%로 낮아 과대 프로비저닝 가능성이 있습니다.`);
    }
  }
  if (rootCauseLines.length === 0) {
    rootCauseLines.push('- 현재 데이터만으로는 명확한 원인 분리가 어려워 추가 태깅 및 비용 allocation 기준이 필요합니다.');
  }

  const solutionSteps = [];
  if (savings.unusedVolumes.length > 0) {
    solutionSteps.push(`1. ${savings.unusedVolumes.map((v) => v.name).join(', ')} 볼륨이 실제 운영에 필요한지 오너 확인`);
    solutionSteps.push('2. 필요 없으면 즉시 삭제, 보존 필요 시 스냅샷 생성 후 볼륨 삭제');
    solutionSteps.push('3. 재발 방지를 위해 EBS 생성 시 owner, ttl, environment 태그를 강제');
  }
  if (findings.some((f) => f.type === 'underused_ec2')) {
    solutionSteps.push('4. m5.xlarge 인스턴스는 성능 테스트 후 더 작은 인스턴스로 리사이징 검토');
  }
  if (solutionSteps.length === 0) {
    solutionSteps.push('1. 리소스 태깅, 비용 allocation, 일정 기반 종료 정책부터 도입');
  }

  const estimatedSavings = savings.finalEstimate || Math.round(cost.avgWaste || 0);

  const analysisText = `## Analysis\n\n### Week\n2\n\n### Scenario ID\nL1-001\n\n### Problem Identification\n${identifiedResources}\n\n### Root Cause\n${rootCauseLines.join('\n')}\n\n### Proposed Solution\n${solutionSteps.map((s) => `- ${s}`).join('\n')}\n\n### Estimated Monthly Savings (USD)\n${estimatedSavings}`;

  const optimizedTf = buildOptimizedTerraform(terraform, savings);
  const reportMd = buildReportMarkdown(form, terraform, metrics, cost, findings, estimatedSavings);
  const prompt = buildGptPrompt(form, terraform, metrics, cost, findings, analysisText, optimizedTf, reportMd, estimatedSavings);

  return {
    findings,
    savings,
    analysisText,
    optimizedTf,
    reportMd,
    prompt,
    estimatedSavings,
  };
}

function buildOptimizedTerraform(terraform, savings) {
  const lines = [];
  lines.push('terraform {');
  lines.push('  required_providers {');
  lines.push('    aws = {');
  lines.push('      source  = "hashicorp/aws"');
  lines.push('      version = "~> 5.0"');
  lines.push('    }');
  lines.push('  }');
  lines.push('}');
  lines.push('');
  lines.push(`provider "aws" {`);
  lines.push(`  region = "${terraform.providerRegion || 'us-east-1'}"`);
  lines.push('}');
  lines.push('');

  terraform.instances.forEach((instance) => {
    lines.push(`resource "aws_instance" "${instance.name}" {`);
    if (instance.ami) lines.push(`  ami           = "${instance.ami}"`);
    const shouldDownsize = instance.instance_type === 'm5.xlarge' && savings.rightsizeSavings > 0;
    lines.push(`  instance_type = "${shouldDownsize ? 't3.medium' : instance.instance_type}"${shouldDownsize ? ' # downsized by heuristic' : ''}`);
    if (instance.subnet_id) lines.push(`  subnet_id     = ${instance.subnet_id}`);
    lines.push('');
    lines.push('  root_block_device {');
    lines.push(`    volume_type           = "${instance.root_volume_type || 'gp3'}"`);
    lines.push(`    volume_size           = ${instance.root_volume_size || 20}`);
    lines.push('    delete_on_termination = true');
    lines.push('  }');
    lines.push('');
    lines.push('  tags = {');
    lines.push(`    Name = "${instance.tags.Name || instance.name}"`);
    lines.push('  }');
    lines.push('}');
    lines.push('');
  });

  terraform.ebsVolumes.forEach((volume) => {
    const isUnused = savings.unusedVolumes.find((v) => v.name === volume.name);
    if (isUnused) {
      lines.push(`# resource "aws_ebs_volume" "${volume.name}" {`);
      lines.push(`#   Removed because it appears unused. Preserve as snapshot if retention is required.`);
      lines.push('# }');
      lines.push('');
      return;
    }

    lines.push(`resource "aws_ebs_volume" "${volume.name}" {`);
    if (volume.availability_zone) lines.push(`  availability_zone = "${volume.availability_zone}"`);
    lines.push(`  size              = ${volume.size}`);
    lines.push(`  type              = "${volume.volume_type === 'gp2' ? 'gp3' : volume.volume_type}"${volume.volume_type === 'gp2' ? ' # migrated from gp2' : ''}`);
    lines.push(`  encrypted         = ${volume.encrypted || 'true'}`);
    lines.push('');
    lines.push('  tags = {');
    Object.entries(volume.tags).forEach(([k, v]) => lines.push(`    ${k} = "${v}"`));
    lines.push('  }');
    lines.push('}');
    lines.push('');
  });

  return lines.join('\n').trim();
}

function buildReportMarkdown(form, terraform, metrics, cost, findings, estimatedSavings) {
  const topFindings = findings.length > 0
    ? findings.map((f) => `- **${f.title}**: ${f.action}`).join('\n')
    : '- 명확한 낭비 항목을 찾지 못했습니다.';

  return `# FinOps Analysis Report\n\n## Company Context\n- 회사명: ${form.companyName || '-'}\n- 업종: ${form.industry || '-'}\n- 직원 수: ${form.employees || '-'}\n- 성장 단계: ${form.growthStage || '-'}\n- 클라우드 성숙도: ${form.cloudMaturity || '-'}\n- FinOps 전담팀: ${form.finopsTeam || '-'}\n- 월 클라우드 비용: $${(form.monthlyCloudCost || 0).toFixed(2)}\n\n## Background\n${form.background || '-'}\n\n## Input Summary\n- Terraform 리소스 수: ${terraform.resources.length}\n- EC2 인스턴스 수: ${terraform.instances.length}\n- EBS 볼륨 수: ${terraform.ebsVolumes.length}\n- 메트릭 시계열 수: ${metrics.records.length}\n- 비용 리포트 개월 수: ${cost.months.length}\n- 평균 월간 낭비 비용: $${cost.avgWaste.toFixed(2)}\n\n## Key Findings\n${topFindings}\n\n## Recommended Actions\n1. 사용되지 않는 EBS 볼륨은 즉시 삭제 또는 스냅샷 전환\n2. 낮은 사용률의 대형 EC2는 성능 검증 후 리사이징\n3. owner / environment / ttl 태그와 정기 유휴 리소스 점검 자동화\n\n## Estimated Monthly Savings\n- **$${estimatedSavings} / month**\n`;
}

function buildGptPrompt(form, terraform, metrics, cost, findings, analysisText, optimizedTf, reportMd, estimatedSavings) {
  return `당신은 FinOps 과제 제출용 답안을 작성하는 분석 AI입니다. 아래 입력을 분석하여 반드시 제출 양식에 맞는 결과를 생성하세요.\n\n[출력 규칙]\n1. Analysis 섹션은 반드시 아래 4개 필드를 포함한다.\n   - Problem Identification\n   - Root Cause\n   - Proposed Solution\n   - Estimated Monthly Savings (USD)\n2. 근거는 반드시 main.tf, metrics.json, cost_report.json에서 찾는다.\n3. 추정치는 과장하지 말고 보수적으로 작성한다.\n4. optional로 Optimized main.tf 와 Markdown Report도 함께 생성한다.\n5. 응답 형식은 아래 JSON 스키마를 따른다.\n\n[JSON 스키마]\n{\n  "analysis": {\n    "problem_identification": "string",\n    "root_cause": "string",\n    "proposed_solution": "string",\n    "estimated_monthly_savings_usd": number\n  },\n  "optimized_main_tf": "string",\n  "report_markdown": "string"\n}\n\n[회사 정보]\n${JSON.stringify({
  companyName: form.companyName,
  industry: form.industry,
  employees: form.employees,
  growthStage: form.growthStage,
  cloudMaturity: form.cloudMaturity,
  finopsTeam: form.finopsTeam,
  monthlyCloudCost: form.monthlyCloudCost,
  background: form.background,
  task: form.task,
  submitFormat: form.submitFormat,
}, null, 2)}\n\n[Terraform 요약]\n${JSON.stringify(terraform, null, 2)}\n\n[Metrics 요약]\n${JSON.stringify(metrics, null, 2)}\n\n[Cost Report 요약]\n${JSON.stringify(cost, null, 2)}\n\n[로컬 휴리스틱 결과]\n${JSON.stringify({ findings, estimatedSavings }, null, 2)}\n\n[현재 로컬 초안]\n${analysisText}\n\n[현재 Optimized main.tf 초안]\n${optimizedTf}\n\n[현재 Report Markdown 초안]\n${reportMd}\n\n이제 최종 JSON만 출력하세요.`;
}

function buildTerraformSummary(terraform) {
  if (!terraform) {
    return 'Terraform 데이터가 없습니다.';
  }

  const instanceTypes = countOccurrences(terraform.instances, 'instance_type');
  const lines = [
    `Provider region: ${terraform.providerRegion || 'unknown'}`,
    `총 리소스 수: ${terraform.resources.length}`,
    `EC2 수: ${terraform.instances.length}`,
    `EBS 수: ${terraform.ebsVolumes.length}`,
    `인스턴스 타입 분포: ${Object.entries(instanceTypes).map(([k, v]) => `${k}=${v}`).join(', ') || '-'}`,
    `EBS 목록: ${terraform.ebsVolumes.map((v) => `${v.name}(${v.size}GB/${v.volume_type})`).join(', ') || '-'}`,
  ];

  return lines.join('\n');
}

function buildCostSummary(cost) {
  if (!cost) {
    return '비용 데이터가 없습니다.';
  }

  const lines = [
    `기간: ${cost.months.length}개월`,
    `평균 월 비용: $${cost.avgTotal.toFixed(2)}`,
    `평균 낭비 비용: $${cost.avgWaste.toFixed(2)}`,
    ...cost.months.map((m) => `${m.month}: total=$${m.total.toFixed(2)}, waste=$${m.waste.toFixed(2)}`),
  ];

  return lines.join('\n');
}

function buildMetricsSummary(metrics) {
  if (!metrics) {
    return '메트릭 데이터가 없습니다.';
  }

  const resourceMap = groupMetricsByResource(metrics.records);
  const lines = [`총 시계열 수: ${metrics.records.length}`];
  Array.from(resourceMap.entries()).slice(0, 12).forEach(([resource, records]) => {
    const compact = records.map((r) => `${r.metric}:avg=${r.average.toFixed(2)}`).join(', ');
    lines.push(`${resource} -> ${compact}`);
  });
  return lines.join('\n');
}

function buildSummaryMarkdown(terraform, cost, metrics) {
  return [
    '# Summary Preview',
    '',
    '## Terraform 리소스 요약',
    '```text',
    buildTerraformSummary(terraform),
    '```',
    '',
    '## 비용 리포트 요약',
    '```text',
    buildCostSummary(cost),
    '```',
    '',
    '## 메트릭 요약',
    '```text',
    buildMetricsSummary(metrics),
    '```',
    ''
  ].join('\n');
}

function renderSummaryMarkdown(terraform, cost, metrics) {
  els.summaryMarkdown.value = buildSummaryMarkdown(terraform, cost, metrics);
}

function destroyChart(chart, canvas) {
  if (chart && typeof chart.destroy === 'function') {
    chart.destroy();
  }

  if (canvas) {
    canvas.removeAttribute('style');
    canvas.width = canvas.clientWidth || 300;
    canvas.height = canvas.parentElement?.clientHeight || 320;
  }
}

function renderCostChart(cost) {
  destroyChart(state.charts.cost, els.costChart);
  if (!cost || cost.months.length === 0 || typeof Chart === 'undefined') return;

  state.charts.cost = new Chart(els.costChart, {
    type: 'bar',
    data: {
      labels: cost.months.map((m) => m.month),
      datasets: [
        { label: 'Total Cost', data: cost.months.map((m) => m.total) },
        { label: 'Waste Cost', data: cost.months.map((m) => m.waste) },
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } }
    }
  });
}

function renderMetricsChart(metrics) {
  destroyChart(state.charts.metrics, els.metricsChart);
  if (!metrics || metrics.records.length === 0 || typeof Chart === 'undefined') return;

  const preferred = metrics.records.find((r) => r.metric.toLowerCase().includes('cpu')) || metrics.records[0];
  state.charts.metrics = new Chart(els.metricsChart, {
    type: 'line',
    data: {
      labels: preferred.values.map((_, idx) => `P${idx + 1}`),
      datasets: [{ label: `${preferred.resource} / ${preferred.metric}`, data: preferred.values }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: true } }
    }
  });
}

function downloadText(filename, content) {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

async function copyText(text) {
  await navigator.clipboard.writeText(text);
}

async function handleFiles() {
  syncSelectedFilesFromInputs();
  reflectSelectedFiles();

  const status = [];
  const warnings = [];

  if (state.uploadedFiles.main) {
    state.files.mainTfText = await readFileAsText(state.uploadedFiles.main);
    status.push(`main.tf loaded`);
  } else if (!state.files.mainTfText) {
    warnings.push('main.tf 없음');
  }

  if (state.uploadedFiles.metrics) {
    const text = await readFileAsText(state.uploadedFiles.metrics);
    const parsed = tryParseJson(text);
    if (parsed) {
      state.files.metricsJson = parsed;
      status.push(`metrics.json loaded`);
    } else {
      warnings.push('metrics.json 파싱 실패');
    }
  } else if (!state.files.metricsJson) {
    warnings.push('metrics.json 없음');
  }

  if (state.uploadedFiles.cost) {
    const text = await readFileAsText(state.uploadedFiles.cost);
    const parsed = tryParseJson(text);
    if (parsed) {
      state.files.costJson = parsed;
      status.push(`cost_report.json loaded`);
    } else {
      warnings.push('cost_report.json 파싱 실패');
    }
  } else if (!state.files.costJson) {
    warnings.push('cost_report.json 없음');
  }

  if (status.length > 0) {
    const suffix = warnings.length > 0 ? ` / ${warnings.join(' / ')}` : '';
    setStatus(`${status.join(' / ')}${suffix}`, true);
    return;
  }

  setStatus('업로드된 파일이 없습니다. 파일 선택 또는 드래그 앤 드롭으로 main.tf를 먼저 넣어주세요.');
}

function loadExample() {
  setFormData(exampleData.company);
  state.files.mainTfText = exampleData.mainTfText;
  state.files.metricsJson = exampleData.metricsJson;
  state.files.costJson = exampleData.costJson;
  state.uploadedFiles.main = null;
  state.uploadedFiles.metrics = null;
  state.uploadedFiles.cost = null;
  setFileLabel('main', '예시 데이터 사용 중');
  setFileLabel('metrics', '예시 데이터 사용 중');
  setFileLabel('cost', '예시 데이터 사용 중');
  setStatus('QuickMart 예시 데이터를 메모리에 로드했습니다.', true);
  runAnalysis();
}

function runAnalysis() {
  const form = getFormData();
  if (!state.files.mainTfText) {
    setStatus('main.tf가 필요합니다. 파일 선택 또는 드래그 앤 드롭 후 다시 분석하세요.');
    return;
  }

  state.parsed.terraform = parseTerraform(state.files.mainTfText);
  state.parsed.metrics = normalizeMetrics(state.files.metricsJson || {});
  state.parsed.cost = normalizeCostReport(state.files.costJson || {});
  state.parsed.findings = analyze(state.parsed.terraform, state.parsed.metrics, state.parsed.cost, form);

  renderSummaryMarkdown(state.parsed.terraform, state.parsed.cost, state.parsed.metrics);
  renderCostChart(state.parsed.cost);
  renderMetricsChart(state.parsed.metrics);

  els.analysisDraft.value = state.parsed.findings.analysisText;
  els.optimizedTf.value = state.parsed.findings.optimizedTf;
  els.gptPrompt.value = state.parsed.findings.prompt;
  setStatus(`분석 완료: 예상 절감액 $${state.parsed.findings.estimatedSavings}/month`, true);
}

function registerFileInput(inputEl, role) {
  inputEl.addEventListener('change', async () => {
    state.uploadedFiles[role] = inputEl.files?.[0] || null;
    await handleFiles();
  });

  const box = inputEl.closest('.upload-box');
  if (!box) return;

  ['dragenter', 'dragover'].forEach((eventName) => {
    box.addEventListener(eventName, (event) => {
      event.preventDefault();
      box.classList.add('dragover');
    });
  });

  ['dragleave', 'dragend', 'drop'].forEach((eventName) => {
    box.addEventListener(eventName, (event) => {
      event.preventDefault();
      box.classList.remove('dragover');
    });
  });

  box.addEventListener('drop', async (event) => {
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;
    state.uploadedFiles[role] = file;
    reflectSelectedFiles();
    await handleFiles();
  });
}

registerFileInput(els.mainTfFile, 'main');
registerFileInput(els.metricsFile, 'metrics');
registerFileInput(els.costFile, 'cost');
els.loadExampleBtn.addEventListener('click', loadExample);
els.analyzeBtn.addEventListener('click', async () => {
  await handleFiles();
  runAnalysis();
});

els.copySummaryBtn.addEventListener('click', async () => copyText(els.summaryMarkdown.value));
els.downloadSummaryBtn.addEventListener('click', () => downloadText('summary-preview.md', els.summaryMarkdown.value));
els.copyAnalysisBtn.addEventListener('click', async () => copyText(els.analysisDraft.value));
els.copyTfBtn.addEventListener('click', async () => copyText(els.optimizedTf.value));
els.copyPromptBtn.addEventListener('click', async () => copyText(els.gptPrompt.value));
els.downloadAnalysisBtn.addEventListener('click', () => downloadText('analysis.md', els.analysisDraft.value));
els.downloadTfBtn.addEventListener('click', () => downloadText('optimized-main.tf', els.optimizedTf.value));
els.downloadPromptBtn.addEventListener('click', () => downloadText('prompt.txt', els.gptPrompt.value));
els.downloadReportBtn.addEventListener('click', () => {
  const report = state.parsed.findings?.reportMd || buildReportMarkdown(getFormData(), state.parsed.terraform || { resources: [], instances: [], ebsVolumes: [] }, state.parsed.metrics || { records: [] }, state.parsed.cost || { months: [], avgWaste: 0 }, state.parsed.findings?.findings || [], state.parsed.findings?.estimatedSavings || 0);
  downloadText('report.md', report);
});

reflectSelectedFiles();

setFormData({
  task: '아래 제공된 자료를 분석하여 비용 낭비 요소를 찾고, 구체적인 개선 방안과 예상 절감액을 제시하세요.',
  submitFormat: 'Problem Identification / Root Cause / Proposed Solution / Estimated Monthly Savings (USD) 형식으로 답변하고, 필요 시 Optimized main.tf 와 Markdown Report도 함께 생성'
});

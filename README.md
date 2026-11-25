# G1 ACQ Plus — Google One SKU 被动识别

本分叉的 v7 和 v8 模块记录 Google One 响应中出现的完整 SKU，并原样放行响应。本机报告会将新旧 2TB / Pro SKU 标记为 **2TB / Pro**。文中的 v8.0.0 功能及价格表属于上游历史资料。


> **开源出处与致谢（Attribution & Credits）**
> - 本项目基于开源项目 [**`crhywun/g1-acq`**](https://github.com/crhywun/g1-acq)（作者：[@crhywun](https://github.com/crhywun)）扩展构建，保留其核心 Shadowrocket `one.google.com` 响应改写、被动 SKU 采集与本机诊断报告架构。
> - 感谢 [@cehomecambodia-lang](https://github.com/cehomecambodia-lang) 在上游 [PR #3](https://github.com/crhywun/g1-acq/pull/3) 中贡献的 Ultra 20TB / 30TB 1 个月免费试用（`g1.20tb.1month_eft.acq` / `g1.ai.ultra.1month_eft.acq`）与 3 个月 1 折（90p）回退方案。
> - **本分支（`v8.0.0`）新增特性**：通过 `BillingClient` 对 15,000+ 个候选命名组合进行全量爆破扫描，首次挖掘并集成了 **Google AI Pro (5 TB) 18 个月 / 15 个月 / 12 个月 / 学生 12 个月 \$0 免费试用**、**Google AI Plus (2 TB / 400 GB) 12 个月 \$0 免费试用**、**100 GB / 200 GB 12 个月 / 9 个月 \$0 免费试用** 等 45 个免费试用档与 80+ 个隐藏折扣档，并在 Safari 本地报告页（`https://one.google.com/g1-sku-report`）中新增了**免改代码的「一键切换目标 SKU 控制台」**。

---

## 一、上游历史功能（`v8.0.0`）

1. **新增 Pro 5TB 单次直开 18 个月 / 15 个月 / 12 个月 \$0 免费试用 SKU**：
   - 原版默认将 `g1.ios.2tb.*` 改写为付费的 `g1.2tb.ai.12months_ip_90p`（\$1.99/月 × 12个月）。
   - `v8.0.0` 默认优先改写为新挖出的 **`g1.2tb.ai.18months_eft`（Pro 5TB 18 个月 \$0 免费试用）**，并内置 21 个隐藏免费/特价 SKU 预设。
2. **Safari 本机控制台「一键切换目标 SKU」**：
   - 打开 `https://one.google.com/g1-sku-report`，直接点击页面表格中的 **「一键切换」** 按钮，即可在手机本地 `$persistentStore` 中实时切换 `g1.ios.2tb.*` 的改写目标（支持 18M 免费、15M 免费、12M 免费、`subs_variant`、学生 12M 免费、12M \$1.99、3M \$1.99、首月 \$0.99、AI Plus 2TB/400GB 12M 免费等），**无需修改任何 JS 代码或重装模块**！
3. **保留 Ultra 20TB / 30TB 1 个月免费试用 + 3 个月 1 折（90p）智能回退**：
   - `g1.ios.20tb.m.v2` → 默认 `g1.20tb.1month_eft.acq`（1 个月免费），自动回退 `g1.20tb.3months_ip_90p.acq`（前 3 个月 \$9.99/月）。
   - `g1.ios.30tb.ai.pro.m` → 默认 `g1.ai.ultra.1month_eft.acq`（1 个月免费），自动回退 `g1.ai.ultra.3months_ip_90p.acq`（前 3 个月 \$19.99/月）。
4. **附带全量实测 SKU 目录（[sku-catalog.json](sku-catalog.json)）**：
   - 收录全量扫描命中的 130+ 个 Google One 有效隐藏 SKU 与完整定价阶段（Pricing Phases）明细。

---

## 二、Shadowrocket 被动识别模块

在 Shadowrocket 的「模块」中添加并启用以下地址。已使用同一地址的用户可刷新模块。

```text
https://raw.githubusercontent.com/BOLUOXIN/g1-acq-plus/main/g1-acq-v8.sgmodule
```

旧文件名 `g1-acq-v7.sgmodule` 提供相同的被动功能。当前配置需能读取 `one.google.com` 的 HTTPS 响应。

打开 Google One 方案页后，在同一台手机的 Safari 中查看[本机 SKU 报告](https://one.google.com/g1-sku-report)。页面顶部显示 `本机脚本已接管 · v8.0.1`；刷新报告即可查看采集活动、2TB / Pro SKU 标记，或导出 JSON。

---

## 三、上游历史 SKU 目录

### 1. Google AI Pro (5 TB) — \$0 免费试用与特价折扣系列

| 隐藏 SKU (Product ID) | Base Plan | Offer ID | 优惠内容 | 续费原价 |
| :--- | :--- | :--- | :--- | :--- |
| **`g1.2tb.ai.18months_eft`** | `monthly` | `eft-18months` | **18 个月 \$0 免费试用** (`P1Y6M`) | \$19.99/月 |
| **`g1.2tb.ai.15months_eft`** | `monthly` | `eft-15months` | **15 个月 \$0 免费试用** (`P1Y3M`) | \$19.99/月 |
| **`g1.2tb.ai.12months_eft`** | `monthly` | `eft-12months` | **12 个月 \$0 免费试用** (`P1Y`) | \$19.99/月 |
| **`g1.2tb.ai.subs_variant`** | `monthly` | `12months-eft` / `6months-eft` / `6months-eft-2` / `6months-eft-ss-2026` | **12 个月 / 6 个月×3 \$0 免费试用** | \$19.99/月 |
| **`g1.play.2tb.ai.student`** | `monthly` | `eft-12mo` | **学生通道 12 个月 \$0 免费试用** (`P1Y`) | \$19.99/月 |
| **`g1.2tb.ai.6months_eft`** | `monthly` | `eft-6months` | **6 个月 \$0 免费试用** (`P6M`) | \$19.99/月 |
| **`g1.2tb.ai.4months_eft`** | `monthly` | `eft-4months` | **4 个月 \$0 免费试用** (`P4M`) | \$19.99/月 |
| **`g1.2tb.ai.3months_eft`** | `monthly` | `eft-3months` | **3 个月 \$0 免费试用** (`P3M`) | \$19.99/月 |
| **`g1.2tb.ai.2months_eft`** | `monthly` | `eft-2months` | **2 个月 \$0 免费试用** (`P2M`) | \$19.99/月 |
| **`g1.play.2tb.ai`** | `monthly` | `eft-3mo` | **3 个月 \$0 免费试用** (`P3M`) | \$19.99/月 |
| **`g1.2tb.ai.12months_ip_90p`** | `p1m` | `ip-12mo-90p` | **前 12 个月 1 折 \$1.99/月**（共 \$23.88/年） | \$19.99/月 |
| **`g1.2tb.ai.12months_ip_75p`** | `p1m` | `introprice` | **前 12 个月 2.5 折 \$4.99/月** | \$19.99/月 |
| **`g1.2tb.ai.3months_ip_90p.acq`** | `p1m` | `introprice` | **前 3 个月 1 折 \$1.99/月**（仅限无订阅新客） | \$19.99/月 |
| **`g1.2tb.ai.2months_ip_90p.acq`** | `p1m` | `introprice` | **前 2 个月 1 折 \$1.99/月**（仅限无订阅新客） | \$19.99/月 |
| **`g1.2tb.ai.1month_ip_95p.acq`** | `p1m` | `introprice` | **首月 0.5 折 \$0.99/月**（仅限无订阅新客） | \$19.99/月 |

### 2. Google AI Ultra (20 TB / 30 TB) — 免费试用与 1 折系列（需无订阅新号）

| 隐藏 SKU (Product ID) | 适用档位 | 优惠内容 | 续费原价 |
| :--- | :--- | :--- | :--- |
| **`g1.20tb.1month_eft.acq`** | Ultra 20TB (5x) | **1 个月 \$0 免费试用** | \$99.99/月 |
| **`g1.20tb.3months_ip_90p.acq`** | Ultra 20TB (5x) | **前 3 个月 1 折 \$9.99/月** | \$99.99/月 |
| **`g1.20tb.3months_ip_80p`** | Ultra 20TB (5x) | **前 3 个月 2 折 \$19.99/月** | \$99.99/月 |
| **`g1.20tb.3months_ip_75p.acq`** | Ultra 20TB (5x) | **前 3 个月 2.5 折 \$24.99/月** | \$99.99/月 |
| **`g1.ai.ultra.1month_eft.acq`** | Ultra 30TB (20x) | **1 个月 \$0 免费试用** | \$199.99/月 |
| **`g1.ai.ultra.3months_ip_90p.acq`** | Ultra 30TB (20x) | **前 3 个月 1 折 \$19.99/月** | \$199.99/月 |
| **`g1.ai.ultra.3months_ip_75p.acq`** | Ultra 30TB (20x) | **前 3 个月 2.5 折 \$49.99/月** | \$199.99/月 |

### 3. Google AI Plus (2 TB / 400 GB) & 基础存储 (100 GB / 200 GB / 30 GB)

| 隐藏 SKU (Product ID) | 适用档位 | 优惠内容 | 续费原价 |
| :--- | :--- | :--- | :--- |
| **`g1.2tb.1year_eft`** | AI Plus (2 TB) | **12 个月 \$0 免费试用** (`P52W1D`) | \$9.99/月 |
| **`g1.2tb.6months_eft`** / **`g1.2tb.subs_variant`** | AI Plus (2 TB) | **6 个月 / 3 个月 \$0 免费试用** | \$9.99/月 |
| **`g1.2tb.3months_ip_90p.acq`** | AI Plus (2 TB) | **前 3 个月 1 折 \$0.99/月** | \$9.99/月 |
| **`g1.play.helium`** / **`g1.play.helium.student`** | AI Plus (400 GB) | **12 个月 / 6 个月 / 3 个月 \$0 免费试用** | \$4.99/月 |
| **`g1.helium.12months_ip_90p`** | AI Plus (400 GB) | **前 12 个月 1 折 \$0.49/月**（共 \$5.88/年） | \$4.99/月 |
| **`g1.100gb.1year_eft`** / **`g1.100gb.annual.1year_eft`** | 100 GB | **12 个月 \$0 免费试用** (`P52W1D`) | \$1.99/月 或 \$19.99/年 |
| **`g1.100gb.9months_eft`** / **`g1.100gb.180days_eft`** | 100 GB | **9 个月 / 180 天 \$0 免费试用** | \$1.99/月 |
| **`g1.200gb.1year_eft`** / **`g1.200gb.180days_eft`** | 200 GB | **12 个月 / 180 天 \$0 免费试用** | \$2.99/月 |
| **`g1.30gb.3month_eft`** / **`g1.30gb.1month_eft`** | 30 GB | **3 个月 / 1 个月 \$0 免费试用** | \$0.89/月 |

---

## 四、免责声明与出处标注

- 响应中替换商品 ID 仅代表客户端向 App Store / Google Play 发起指定 SKU 的收银台请求，最终是否展示试用、订阅周期与扣款金额**一律以 App Store / Google Play 原生收银台弹窗显示为准**。
- **原始项目出处**：[https://github.com/crhywun/g1-acq](https://github.com/crhywun/g1-acq)（作者：[@crhywun](https://github.com/crhywun)，PR #3 贡献者：[@cehomecambodia-lang](https://github.com/cehomecambodia-lang)）。
- 友情链接：LinuxDo 开源社区(https://linux.do/)
有任何问题联系推特：https://x.com/zixunclub

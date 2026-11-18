# wxtools · 静态工具站

纯静态的 ROM / 工具导航站，使用原生 HTML / CSS / JavaScript 构建，**零依赖、无构建步骤**。

---

## 功能特性

- **多分区管理说明** — 详细的分区管理文档
- **ROM 下载导航** — 各大机型 ROM 资源入口
- **扩展与功能页** — 工具与扩展介绍
- **深色模式 / 响应式** — 统一的交互与视觉体验
- **多语言 (i18n)** — 内置中英文切换

---

## 技术栈

原生 HTML5 / CSS3 / JavaScript（ES6+），**无框架、无打包器、无第三方依赖**。

---

## 快速开始

### 本地预览

```bash
git clone <this-repo>
cd wxtools
```

双击 `index.html` 即可查看，或使用本地服务器：

```bash
python -m http.server 8080
# 或
npx serve .
```

访问 <http://localhost:8080>。

### 部署

```bash
# GitHub Pages：仓库 Settings → Pages → 选择分支根目录

# Nginx
server {
    listen 80;
    server_name tools.example.com;
    root /var/www/wxtools;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
}
```

---

## 构建说明

**无构建步骤**，直接编辑源文件即生效。

| 目录 | 用途 |
|------|------|
| `index.html` | 首页 |
| `contact.html` | 联系页 |
| `rom/index.html` | ROM 导航页 |
| `tools/` | 工具页（`index.html` / `download.html` / `update.html` / `contact.html`） |
| `tools/doc/` | 工具文档页（含 `普通分区管理使用说明.md`） |
| `docs/index.html` | 文档页 |
| `static/css/` | 样式（`style` / `header` / `footer` / `dashboard` / `doc` / `download` 等） |
| `static/js/` | 脚本（`config` / `i18n` / `theme` / `animations` / `slideshow` / `page-transition` / `img-protect`） |
| `static/images/` | 图片资源 |

站点配置在 `static/js/config.js`，文案在 `static/js/i18n.js`。

---

## 目录结构

```
wxtools/
├── index.html
├── contact.html
├── favicon.ico
├── docs/index.html
├── rom/index.html
├── tools/
│   ├── index.html
│   ├── download.html
│   ├── update.html
│   ├── contact.html
│   └── doc/
│       ├── index.html
│       ├── favicon.ico
│       ├── static/css/doc.css
│       └── 普通分区管理使用说明.md
└── static/
    ├── css/
    ├── js/
    └── images/
```

---

## 许可

MIT License — © 2026 ZMCNET（没有心科技）

详见 [LICENSE](LICENSE)。
<template>
  <div class="layout-container">

    <header class="main-header">
      <nav class="nav-container">
        <!-- 左侧Logo -->
        <div class="logo">
          <span class="logo-main">匠模</span>
          <span class="logo-sub">久</span>
        </div>

        <!-- 中间导航菜单 -->
        <div class="nav-center">
          <div class="horizontal-menu">
            <div class="menu-item active">个人<div class="active-line"></div></div>
            <div class="menu-item">推荐</div>
            <div class="menu-item">模板社区</div>
          </div>
        </div>


        <!-- 新增右侧按钮 -->
        <div class="nav-right">
          <el-badge :value="7" class="notification-badge">
            <el-button circle class="icon-btn">
              <el-icon :size="20"><Bell /></el-icon>
            </el-button>
          </el-badge>
          <el-button circle class="avatar-btn">P</el-button>
        </div>

      </nav>
    </header>

    <main class="main-content">
      <!-- 活动横幅 -->
      <div class="promotion-banner">
        <h2>JiuDa Automatic 开工节</h2>
        <p>立享会员6折优惠！开启智能高效工作新篇章！</p>
        <el-button type="primary">立即领取</el-button>
        <div class="close-icon">×</div>
      </div>

      <!-- 基本信息 -->
      <el-card class="info-card">
        <div class="card-header">
          <h3>基本信息</h3>
          <div class="header-right">
            <el-button type="link">编辑</el-button>
          </div>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <label>昵称</label>
            <div class="info-content">PO_5E2D53</div>
          </div>
          <div class="info-item">
            <label>行业</label>
            <div class="info-content">无</div>
          </div>
          <div class="info-item">
            <label>公司</label>
            <div class="info-content">无</div>
          </div>
          <div class="info-item">
            <label>职业（学历）</label>
            <div class="info-content">无</div>
          </div>
        </div>
      </el-card>

      <!-- 账号权益 -->
      <el-card class="section">
        <h3>账号权益</h3>
        <div class="account-tier">
          <span>个人版账户</span>
          <el-tag type="warning">免费版</el-tag>
          <el-button type="primary" size="small">升级</el-button>
        </div>
      </el-card>

      <!-- 账号安全 -->
      <el-card class="section">
        <h3>账号安全</h3>
        <div class="security-item">
          <span>手机号：</span>
          <el-button type="link">暂未绑定 立即绑定</el-button>
        </div>
        <div class="security-item">
          <span>邮箱号：</span>
          <el-button type="link">暂未绑定 立即绑定</el-button>
        </div>
        <div class="security-item">
          <span>密码：</span>
          <el-button type="link">暂未设定 立即设定</el-button>
        </div>
        <div class="social-bindings">
          <el-button v-for="social in ['微信', 'QQ', '微博', '腾讯会议']" :key="social" circle>
            {{ social }}
          </el-button>
        </div>
      </el-card>

      <!-- 设备管理 -->
      <el-card class="section">
        <h3>设备管理</h3>
        <p class="tip">1个账号最多仅允许10台设备登录</p>
        <div class="device-item" v-for="device in devices" :key="device.id">
          <div>
            <span class="device-name">{{ device.name }}</span>
            <span class="device-time">{{ device.time }}</span>
            <el-tag v-if="device.current" type="success">当前设备</el-tag>
          </div>
          <el-button type="link" class="logout-btn">下线</el-button>
        </div>
      </el-card>

      <!-- 邀请链接 -->
      <el-card class="section">
        <h3>邀请链接</h3>
        <div class="invite-link">
          <el-input
              value="https://www.processon.com//6469d25fe3949f4c21fd?full_name=PO_5E2D53"
              readonly
              class="link-input"
          />
          <el-button type="primary">复制</el-button>
        </div>
        <p class="tip">这是您的专属邀请链接，丰厚奖励等你来领</p>
      </el-card>

      <!-- 关闭账号 -->
      <el-card class="section logout-section">
        <h3>关闭账号</h3>
        <p class="warning-tip">注销成功后您在此账号下的用户数据将被永久清除，所有权益都将关闭。</p>
        <el-button type="danger">继续注销此账号</el-button>
      </el-card>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Bell } from '@element-plus/icons-vue'
const devices = ref([
  {
    id: 1,
    name: '网页端Edge_134.0.0.0',
    time: '2025-04-10 11:40:52 辽宁省',
    current: true
  },
  {
    id: 2,
    name: '网页端Edge_133.0.0.0',
    time: '2025-02-27 16:00:30',
    current: false
  }
])
</script>

<style scoped>
.layout-container {
  min-height: 100vh;
  background: #f5f7fa;
}

/* 导航栏样式 */
.main-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 30px;
  height: 64px;
  display: flex;
  align-items: center;
  position: relative;
}

.logo {
  display: flex;
  align-items: baseline;
  position: absolute;
  left: 30px;
}

.logo-main {
  color: #285dc1;
  font-size: 26px;
  top: -1px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.logo-sub {
  color: #ea1123;
  font-size: 26px;
  position: relative;
  font-weight: 700;
  padding-left: 2px;
}

.nav-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.horizontal-menu {
  display: flex;
  gap: 40px;
}

.menu-item {
  font-size: 16px;
  color: #666;
  padding: 8px 0;
  position: relative;
  cursor: pointer;
  transition: color 0.3s;
}

.menu-item.active {
  color: #673ab7;
  font-weight: 500;
}

.active-line {
  width: 40px;
  height: 3px;
  background: #673ab7;
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
}

/* 右侧按钮样式 */
.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
}

.icon-btn {
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  background: #f5f5f5;

  &:hover {
    background: #e8e8e8;
  }
}

.avatar-btn {
  width: 36px;
  height: 36px;
  padding: 0;
  background: #673ab7;
  color: white;
  font-weight: 500;
  border: none;

  &:hover {
    background: #7e57c2;
  }
}

/* 调整通知徽标位置 */
:deep(.el-badge__content) {
  top: 2px;
  right: 2px;
  padding: 0 4px;
  height: 16px;
  line-height: 16px;
}

/* 主体内容 */
.main-content {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.promotion-banner {
  background: linear-gradient(135deg, #673ab7, #8561c5);
  color: white;
  padding: 30px;
  border-radius: 8px;
  margin-bottom: 24px;
  position: relative;
  text-align: center;
}

.promotion-banner h2 {
  font-size: 24px;
  margin-bottom: 12px;
}

.promotion-banner p {
  color: #e6d5ff;
  margin-bottom: 20px;
}

.close-icon {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  font-size: 24px;
}

/* 卡片通用样式 */
.el-card {
  margin-bottom: 20px;
  border-radius: 8px !important;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 32px;
  height: 32px;
  background: #ffc107;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: center;
}

.info-item label {
  color: #666;
  min-width: 100px;
}

/* 账号安全 */
.security-item {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}

.security-item span {
  min-width: 80px;
}

.social-bindings {
  margin-top: 20px;
  display: flex;
  gap: 12px;
}

.social-bindings .el-button {
  width: 40px;
  height: 40px;
}

/* 设备管理 */
.device-item {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.device-name {
  color: #333;
  margin-right: 12px;
}

.device-time {
  color: #999;
  font-size: 12px;
}

.logout-btn:hover {
  color: #f56c6c !important;
}

/* 邀请链接 */
.invite-link {
  display: flex;
  gap: 10px;
  margin: 16px 0;
}

.link-input {
  flex: 1;
}

.link-input :deep(.el-input__inner) {
  background: #f8f8f8;
  border-color: #eee;
}

/* 注销账号 */
.logout-section {
  text-align: center;
  background: #fff9f9;
  border: 1px solid #ffeaea;
}

.warning-tip {
  color: #f56c6c;
  margin: 16px 0;
}

/* 交互效果 */
.el-button {
  transition: all 0.3s;
}

.el-button--primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.el-button--link {
  color: #666;
}

.el-button--link:hover {
  color: #673ab7 !important;
}
</style>


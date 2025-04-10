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
            <!-- 按钮布局 -->
            <div v-if="editStates.base" class="edit-buttons">
              <el-button
                  plain
                  @click="saveUserInfo"
                  class="save-btn"
              >
                保存
              </el-button>
              <el-button
                  plain
                  @click="toggleEdit('base')"
                  class="cancel-btn"
              >
                取消
              </el-button>
            </div>
            <el-button
                v-else
                @click="toggleEdit('base')"
            >
              编辑
            </el-button>
          </div>
        </div>
        <div class="info-grid">
          <div class="info-item" v-for="field in baseFields" :key="field.key">
            <label>{{ field.label }}</label>
            <!-- 编辑模式显示输入框 -->
            <el-input
                v-if="editStates.base"
                v-model="userInfo[field.key]"
                :placeholder="field.placeholder"
                class="info-input"
                clearable
                maxlength="10"
            />
            <!-- 非编辑模式显示文本 -->
            <div v-else class="info-content">
              {{ userInfo[field.key] || field.default }}
            </div>
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
          <el-button >暂未绑定 立即绑定</el-button>
        </div>
        <div class="security-item">
          <span>邮箱号：</span>
          <el-button >暂未绑定 立即绑定</el-button>
        </div>
        <div class="security-item">
          <span>密码：</span>
          <el-button >暂未设定 立即设定</el-button>
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
import { ElMessage, ElMessageBox } from 'element-plus'
// 用户数据
const userInfo = reactive({
  nickname: '',
  industry: '',
  company: '',
  profession: ''
})
// 原始数据存储(修改前)
const originalData = reactive({})

// 编辑状态管理
const editStates = reactive({
  base: false,
  security: false,
  device: false
})

// 字段配置
const baseFields = [
  { key: 'nickname', label: '昵称', placeholder: '请输入昵称', default: 'PO_5E2D53' },
  { key: 'industry', label: '行业', placeholder: '请选择行业', default: '无' },
  { key: 'company', label: '公司', placeholder: '请输入公司名称', default: '无' },
  { key: 'profession', label: '职业（学历）', placeholder: '请输入职业信息', default: '无' }
]

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

// 切换编辑状态
/*const toggleEdit = (type) => {
  editStates[type] = !editStates[type]
  if (!editStates[type]) resetFields(type)
}*/

// 重置字段
const resetFields = (type) => {
  if (type === 'base') {
    // 还原到原始数据
    Object.keys(userInfo).forEach(key => {
      userInfo[key] = originalData[key]
    })
  }
}

// 获取用户信息
const fetchUserInfo = async () => {
  try {
    // 模拟API返回数据
    const mockData = {
      nickname: 'PO_5E2D53',
      industry: '互联网',
      company: '匠模科技',
      profession: '前端工程师'
    }
    // const { data } = await axios.get('/api/user/info')
    // 保存原始数据
    Object.assign(originalData, mockData)
    Object.assign(userInfo, mockData)
  } catch (error) {
    ElMessage.error('获取用户信息失败')
  }
}

// 保存用户信息
const saveUserInfo = async () => {
  try {
    // await axios.put('/api/user/info', userInfo)
    ElMessage.success('信息更新成功')
    editStates.base = false
  } catch (error) {
    ElMessage.error('保存失败，请重试')
  }
}

// 初始化获取数据
onMounted(fetchUserInfo)
const toggleEdit = (type) => {
  if (editStates[type]) {
    ElMessageBox.confirm('确认放弃修改？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      resetFields(type)
      editStates[type] = false
    }).catch(() => {
      // 点击取消时保持编辑状态
    })
  } else {
    // 进入编辑模式时保存当前状态
    Object.assign(originalData, userInfo)
    editStates[type] = true
  }
}
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

/*编辑相关样式*/
.action-bar {
  margin-top: 20px;
  text-align: right;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.info-item .el-input {
  width: 220px;
}

/* 信息展示网格布局 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  min-height: 40px;
}

/* 输入框样式 */
.info-input {
  width: 220px;
  padding: 8px 12px;
  font-size: 14px;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: #673ab7;
  }
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

.header-right {
  position: relative;
}

.edit-buttons {
  display: flex;
  align-items: center;
  gap: 5px;
}

.save-btn {
  order: 1;
  margin-right: 5px; /* 控制间距 */
  color: #409eff !important; /* 蓝色强调色 */
}

.cancel-btn {
  order: 2;
  color: #909399 !important; /* 灰色弱化 */
}

/* 调整按钮悬停效果 */
.save-btn:hover {
  color: #66b1ff !important;
}
/* 保存按钮加载状态 */
.save-btn.is-loading {
  position: relative;
  padding-right: 32px;

  &::after {
    content: '';
    position: absolute;
    right: 12px;
    top: 50%;
    width: 14px;
    height: 14px;
    border: 2px solid #fff;
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 0.8s linear infinite;
  }
}

.cancel-btn:hover {
  color: #a6a9ad !important;
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


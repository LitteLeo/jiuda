<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-aside
        :width="isCollapse ? '65px' : '200px'"
        style="border-right: 1px solid #eee; transition: all 0.3s; position: relative;">

      <div class="logo">
        <transition name="custom-enter-only">
              <span
                  v-show="!isCollapse"
                  style="font-size:28px; font-weight: 800; margin-right: 3px; display: inline-block;"
              >
                匠模
              </span>
        </transition>
        <img src="@/assets/jiu.jpg" alt="Logo">
      </div>

      <el-row style="margin-top: 20px; height: 40px; padding: 0 10px;">
        <el-col :span="24">
          <el-button
              @click="handleCreateNew"
              type="primary"
              size="default"
              :style="{
                  width: isCollapse ? '40px' : '100%',
                  minWidth: 'auto', /* 关键覆盖 */
                  padding: '0',     /* 关键覆盖 */
                  // borderRadius: isCollapse ? '50%' : '4px' /* 可选圆角优化 */
                }"
              style="display: inline-flex; transition: all 0.3s;">
            <el-icon :size="20"><Plus /></el-icon>
            <span v-show="!isCollapse" style="margin-left:5px">新建</span>
          </el-button>
        </el-col>
      </el-row>

      <el-menu
          :collapse="isCollapse"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          router
          style="margin-top: 20px;"
          :collapse-transition ="false">

        <el-menu-item index="/main/recent-formula">
          <el-icon><Clock /></el-icon>
          <span>最近算式</span>
        </el-menu-item>

        <el-menu-item index="/main/formula">
          <el-icon><Folder /></el-icon>
          <span>我的算式</span>
        </el-menu-item>

        <el-menu-item index="/main/projects">
          <el-icon><Suitcase /></el-icon>
          <span>我的项目</span>
        </el-menu-item>

        <el-menu-item index="/main/template-community">
          <el-icon><Grid /></el-icon>
          <span>模板社区</span>
        </el-menu-item>

        <el-menu-item index="/main/recycle-bin">
          <el-icon><Delete /></el-icon>
          <span>回收站</span>
        </el-menu-item>

      </el-menu>

    </el-aside>

    <!-- 折叠开关 -->
    <div
        class="collapse-trigger"
        :style="{ left: isCollapse ? '64px' : '200px' }"
        @click="toggleCollapse"
    >
      <el-icon :size="20">
        <component
            :is="isCollapse ? 'ArrowRight' : 'ArrowLeft'"
            class="trigger-icon"
            :class="{ reverse: isCollapse }"
        />
      </el-icon>
    </div>

    <!-- 右侧header和main -->
    <el-container>
      <el-header style="display: flex; align-items: center; justify-content: space-between; font-size: 15px; line-height: 60px;background-color: #F6F7F8;">
        <el-col :span="5" :offset="0" >
          <el-input
              :prefix-icon = "Search"
              v-model="keyword"
              placeholder="输入关键词进行搜索">
          </el-input>
        </el-col>

        <div style="display: flex; align-items: center;">
          <el-dropdown>
            <el-badge is-dot class="item" size="large">
              <el-icon class="el-icon-bell" style=" font-size: 20px; vertical-align: middle; "><Bell /></el-icon>
            </el-badge>
            <template #dropdown>
              <el-dropdown-menu style="width: 90px;">
                <el-dropdown-item >
                  <el-badge :value="12" class="mark">
                    最近消息
                  </el-badge>
                </el-dropdown-item>
                <el-dropdown-item >
                  <el-badge :value="3" class="mark">
                    未读消息
                  </el-badge>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- shape="square" -->

          <el-dropdown

              placement="bottom-end"
              style="display: flex; align-items: center; cursor: pointer;"
          >
            <!-- 触发区域 -->
            <div class="user-info-trigger">
              <el-avatar
                  :icon="UserFilled"
                  :size="30"
                  style="margin-left: 15px; margin-right: 10px; vertical-align: middle;"
              />
              <span style="vertical-align: middle;">王小明</span>
              <el-icon style="margin-left: 5px;"><arrow-down /></el-icon>
            </div>

            <!-- 下拉菜单 -->
            <template #dropdown>
              <el-dropdown-menu style="width: 120px;">
                <el-dropdown-item @click="handlePersonalCenter">
                  <el-icon><user /></el-icon>
                  <span>个人中心</span>
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><switch-button /></el-icon>
                  <span>退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

        </div>
      </el-header>

      <el-main style="background-color: #F6F7F8;">
        <div class="main-container flex" style="margin-left: 3vh;">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </el-main>

    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage,ElMessageBox } from 'element-plus'
import { Message, Setting,Clock,Folder,Suitcase,Grid,Delete,Plus,ArrowRight,ArrowLeft,User,Search,
  Bell,UserFilled,ArrowDown,SwitchButton
} from '@element-plus/icons-vue'

import { useRouter } from 'vue-router';

const router = useRouter();
const handleCreateNew = () => {
  const route = router.resolve({ name: 'excel' });
  window.open(route.href, '_blank');

};

// 响应式状态直接声明
const isCollapse = ref(false)

// 方法直接定义成函数
const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}

// 点击'个人中心'按钮跳转
const handlePersonalCenter = () => {
  router.push('/setting') // 确保路由配置中存在该路径
  // 或使用命名路由
  // router.push({ name: 'setting' })
}

// 点击'退出登录'按钮跳转
const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗?', '提示', {
    // 用户点击确定
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 清除token等操作...
    // 1. 清除用户token
    // localStorage.removeItem('token')
    // 2. 清除用户信息
    // store.commit('user/clearUserInfo')
    router.push('/login')
  }).catch(() => {
    // 用户点击取消
    ElMessage.info('已取消退出')
  })
}
</script>

<style scoped>

/* 新增折叠控制器样式 */
.collapse-trigger {
  position: absolute;
  top: 50%;
  left: 200px; /* 初始位置与展开宽度一致 */
  transform: translateY(-50%);
  width: 20px;
  height: 40px;
  background: #fff;
  border: 1px solid #eee;
  border-left: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 9999; /* 保证在最上层 */
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

/* 添加鼠标悬停动画 */
.collapse-trigger:hover {
  background: #f5f7fa;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.15);
}

.logo {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 60px; /* 设置父容器高度 */
  width: 100%; /* 父容器宽度为100% */
}

.logo img {
  max-height: 60%; /* 让图片的高度自适应父容器 */
  max-width: 100%; /* 确保图片宽度也不会超出 */
}

/* 仅保留进场动画 */
.custom-enter-only-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.custom-enter-only-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}

/* 禁用离场动画 */
.custom-enter-only-leave-active {
  transition: none !important;
  animation: none !important;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: #FFFFFF;
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: #FFFFFF;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
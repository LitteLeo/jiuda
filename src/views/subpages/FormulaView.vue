<template>
  <div>
    <el-row type="flex" justify="space-between">
      <!-- 减速机链接 -->
      <el-col :span="20" style="display: flex; gap: 30px;">

        <el-link
            :underline="false"
            :style="{
            color: selectedType === '减速机' ? '#409EFF' : '#606266',
            marginRight: '25px'
          }"
            @click="switchType('减速机')">
          减速机
        </el-link>


        <!-- 轴连器链接 -->

        <el-link
            :underline="false"
            :style="{
            color: selectedType === '轴连器' ? '#409EFF' : '#606266'
          }"
            @click="switchType('轴连器')">
          轴连器
        </el-link>

      </el-col>
      <el-col :span="4" style="display: flex; justify-content: flex-end; gap: 10px;">
        <el-button :icon="Filter" size="mini" circle />
        <el-button :icon="Switch" size="mini" circle />
      </el-col>
    </el-row>

    <!-- <el-divider></el-divider> -->

    <!-- 卡片区域 -->
    <!-- 移出未使用的index   -->
    <el-row :gutter="30" style="margin-top: 20px;">
      <el-col
          v-for="item in paginatedCards"
          :key="item.id"
          :span="4"
          class="card-col">
        <el-card :body-style="{ padding: '0px' }" shadow="hover"
                 @click="handleCreateNew">
          <img src="@/assets/chanpin.png" class="image">
          <div class="card-content">
            <span>久达公司 {{ item.title }} 类模板</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--    <el-row :gutter="30" style="margin-top: 20px;">
          <el-col
              v-for="(item, index) in paginatedCards"
              :key="item.id"
              :span="4"
              class="card-col">
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img src="@/assets/chanpin.png" class="image">
              <div class="card-content">
                <span>久达公司 {{ item.title }} 类模板</span>
              </div>
            </el-card>
          </el-col>
        </el-row>-->

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          @current-change="handlePageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Filter, Switch } from '@element-plus/icons-vue'

const router = useRouter() // ✅ 正确作用域

const handleCreateNew = () => {
  const route = router.resolve({ name: 'excel' })
  window.open(route.href, '_blank')
}
</script>


<script>

export default {
  data() {
    return {
      Filter,Switch,
      // 改造数据：增加 type 字段区分类型
      cards: Array.from({ length: 45 }, (_, i) => ({
        id: i + 1,
        type: i < 20 ? '减速机' : '轴连器', // 前20项是减速机，后20项是轴连器
        title: `模板${i + 1}`
      })),
      pageSize: 12,
      currentPage: 1,
      selectedType: '减速机' // 新增：当前选中分类
    };
  },
  computed: {
    // 先过滤当前类型，再分页
    paginatedCards() {
      const filtered = this.cards.filter(item => item.type === this.selectedType);
      const start = (this.currentPage - 1) * this.pageSize;
      return filtered.slice(start, start + this.pageSize);
    },
    // 当前分类总页数
    total() {
      return this.cards.filter(item => item.type === this.selectedType).length;
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
    // 新增：切换分类方法
    switchType(type) {
      this.selectedType = type;
      this.currentPage = 1; // 切换分类时重置页码
    }
  }
};
</script>

<!-- <script>
export default {
  name: 'App',
  data() {
      const item = {

      };
      return {
        tableData: Array(20).fill(item),
        currentDate: new Date(),
        input2: ''
      }
    }
}
</script> -->

<style>
/* 卡片区域开始 */

.el-card:hover {
  cursor: pointer; /* 手型光标 */
  /* 其他悬停效果（可选） */
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.dibu {
  display: flex;
  align-items: center; /* 垂直居中 */
}


/* 卡片区域结束 */
/* 让整个页面有间距，更美观 */
.container {
  padding: 20px;
}

/* 卡片列，增加底部间距让行距更大 */
.card-col {
  margin-bottom: 30px;
}

/* 调整 Card 比例，让它成为竖着的长方形 */
.image {
  width: 100%;
  aspect-ratio: 3/4; /* 让卡片变成长方形 */
  object-fit: cover;
  border-radius: 5px 5px 0 0; /* 圆角美观 */
}

/* 卡片内部内容 */
.card-content {
  padding: 14px;
  text-align: center;
  font-weight: bold;
}

/* 分页始终居中 */
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px; /* 增加与内容的间距 */
}

</style>
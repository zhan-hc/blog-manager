<template>
  <div>
    <div class="top">
      <el-input v-model="input1" style="width: 200px;" size="large" placeholder="Please Input">
        <template #suffix>
          <i-ep-search style="font-size: 12px;"></i-ep-search>
        </template>
      </el-input>
      <el-button type="success" @click="append"> <i-ep-plus style="font-size: 16px;"
          class="icon_button"></i-ep-plus>上传</el-button>
    </div>
    <div class="content">
      <el-table :data="tableData" :row-key="(row: any) => row.tag_id" style="width: 100%" max-height="250">
        <el-table-column prop="tag_name" label="Name" width="150" />
        <el-table-column prop="tag_desc" label="desc" width="150" />
        <el-table-column prop="create_item" label="create" width="150" />
        <el-table-column prop="update_time" label="update" width="150" />
        <el-table-column label="Operations">
          <template #default="scope">
            <el-button size="small" type="warning" @click="redact(scope.row.tag_id)">
              <i-ep-edit class="icon_button"></i-ep-edit>
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="tapDelete(scope.row.tag_id)">
              <i-ep-delete class="icon_button"></i-ep-delete>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 编辑弹窗 -->
      <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
        <div class="lien">
          <span>名字：</span>
          <el-input v-model="tag_name" autocomplete="off" placeholder="请输入名字" maxlength="80%" />
        </div>
        <div class="lien">
          <span>描述：</span>
          <el-input v-model="tag_desc" autocomplete="off" placeholder="请输入描述" maxlength="50" />
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogOk">确定</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
              取消
            </el-button>
          </span>
        </template>
      </el-dialog>


    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref, markRaw, watch } from 'vue'
import { Delete } from '@element-plus/icons-vue'

interface TagItem {
  tag_id: string;
  tag_name: string;
  tag_desc: string;
  create_item: string;
  update_time: string;
}
// 列表数据
const tableData = ref<Array<TagItem>>([
  {
    tag_id: '1',
    tag_name: 'VUE3',
    tag_desc: '55555',
    create_item: '55555',
    update_time: '55555',
  },
  {
    tag_id: '2',
    tag_name: 'VUE4',
    tag_desc: '描述',
    create_item: '123456',
    update_time: '7894566555',
  },
])
const input1 = ref('') // 搜索框
const tag_name = ref('') // 弹框里面的名字
const tag_desc = ref('') // 弹框里面的描述
const dialogFormVisible = ref(false) // 弹框是否显示
const time_id = ref<string>('') // 被点击编辑的id

const redactIsAdd = ref('1') // 标识弹框现在是谁在使用 0 编辑 1新增
const dialogTitle = ref('新增内容') // 弹框标题

// 点击新增按钮
const append = () => {
  redactIsAdd.value = '1'
  dialogFormVisible.value = true
}
// 点击编辑按钮
const redact = (id: string) => {
  redactIsAdd.value = '0'
  time_id.value = id
  dialogFormVisible.value = true
}
// 监听用户点击那个按钮 动态设置弹框标题
watch(redactIsAdd, (newValue) => {
  if (newValue == '0') {
    dialogTitle.value = '修改内容'
  } else if (newValue == '1') {
    dialogTitle.value = '添加内容'
  }
})
// 点击弹框的确定  此函数决定调用 编辑or添加（弹框确定函数分发器）
const dialogOk = () => {
  if (redactIsAdd.value == '0') {
    redactOk()
  } else if (redactIsAdd.value == '1') {
    appendOk()
  }
}



// 进行编辑
const redactOk = () => {
  tableData.value.forEach(item => {
    if (item.tag_id == time_id.value) {
      item.tag_name = tag_name.value
      item.tag_desc = tag_desc.value
      item.update_time = getDate()
      dialogFormVisible.value = false
      ElMessage({
        message: '修改成功',
        type: 'success',
      })

    }
  })
}
// 进行添加
const appendOk = () => {
  let item = {
    tag_id: getDate(),
    tag_name: tag_name.value,
    tag_desc: tag_desc.value,
    create_item: getDate(),
    update_time: getDate(),
  }
  tableData.value.unshift(item)
  ElMessage({
    message: '添加成功',
    type: 'success',
  })
  dialogFormVisible.value = false
}
// 编辑弹窗状态只要变化 就清空内容
watch(dialogFormVisible, () => {
  tag_name.value = ''
  tag_desc.value = ''
})
// 点击进行删除
const tapDelete = (id: string) => {
  ElMessageBox.confirm(
    '确认删除嘛?',
    '提示',
    {
      type: 'warning',
      icon: markRaw(Delete),
      cancelButtonText: '取消',
      confirmButtonText: '确定'
    }
  ).then(() => {
    tableData.value.forEach((item, index) => {
      if (item.tag_id == id) {
        tableData.value.splice(index, 1);
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
      }
    });
  }).catch(() => {
    console.log('no');
  })
}
// 获取当前时间戳（毫秒）(字符串)
const getDate = () => {
  return new Date().getTime().toString();
}
</script>

<style scoped lang='scss'>
// 按钮中加图标 不协调用这个
.icon_button {
  margin-right: 5px;
  margin-left: -5px;
}

.lien {
  display: flex;
  margin-bottom: 20px;
}
</style>
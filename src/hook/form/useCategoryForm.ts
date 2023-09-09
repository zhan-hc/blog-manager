import { reactive, toRefs, ref } from 'vue'
import { getCategoryToId, updateCategory, addCategory } from '@/api/category'
import type { FormInstance } from 'element-plus'

export default function () {
    const categoryFormRef = ref<FormInstance>()
    const state = reactive({
        popupFormData: { // 表单数据
            category_name: '',
            category_desc: '',
            category_id: '',
        },
    })
    // 表单的校验
    const rules = {
        category_name: [
            { required: true, message: '请输入名字', trigger: 'blur' }
        ],
        category_desc: [
            { required: true, message: '请输入描述', trigger: 'blur' }
        ]
    }

    // 点击编辑或新增--打开弹窗
    const tapOpenPopup = async (id?: string) => {
        if (id) {
            const [_err, { category_name, category_desc, category_id }]: any = await getCategoryToId(id)
            state.popupFormData.category_name = category_name
            state.popupFormData.category_desc = category_desc
            state.popupFormData.category_id = category_id
        }
    }
    // 点击弹框的确定  此函数决定调用 编辑或添加
    const submitForm = async (isAdd: boolean) => {
        if (!categoryFormRef?.value) return
        await categoryFormRef.value.validate().then(async () => {
            if (isAdd) {
                await appendOk()
            } else {
                await redactOk()
            }
        }).catch(err => {
            console.log('表单校验失败', err);
        })
    }

    // 进行添加
    const appendOk = async () => {
        let item = {
            category_name: state.popupFormData.category_name,
            category_desc: state.popupFormData.category_desc,
            create_time: +new Date(),
            update_time: +new Date(),
        }
        const [err]: any = await addCategory(item)
        if (!err) {
            ElMessage({
                message: '添加成功',
                type: 'success',
            })
        }
    }
    // 进行编辑
    const redactOk = async () => {
        let data = {
            category_id: state.popupFormData.category_id,
            category_name: state.popupFormData.category_name,
            category_desc: state.popupFormData.category_desc,
            update_time: +new Date(),
        }
        const [err]: any = await updateCategory(data)
        if (!err) {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
        }
    }

    // 弹窗关闭回调 用来清空数据
    const offPopup = () => {
        state.popupFormData.category_name = ''
        state.popupFormData.category_desc = ''
    }

    return {
        ...toRefs(state),
        rules,
        categoryFormRef,
        tapOpenPopup,
        offPopup,
        submitForm
    }
}
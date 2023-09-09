import { reactive, toRefs, ref } from 'vue'
import { getTagToId, updateTag, addTag } from '@/api/tag'
import type { FormInstance } from 'element-plus'

export default function () {
    const tagFormRef = ref<FormInstance>()
    const state = reactive({
        popupFormData: { // 表单数据
            tag_name: '',
            tag_desc: '',
            tag_id: '',
        },

    })
    // 表单的校验
    const rules = {
        tag_name: [
            { required: true, message: '请输入名字', trigger: 'blur' }
        ],
        tag_desc: [
            { required: true, message: '请输入描述', trigger: 'blur' }
        ]
    }

    // 点击编辑或新增--打开弹窗
    const tapOpenPopup = async (id?: string) => {
        if (id) {
            const [_err, { tag_name, tag_desc, tag_id }]: any = await getTagToId(id)
            state.popupFormData.tag_name = tag_name
            state.popupFormData.tag_desc = tag_desc
            state.popupFormData.tag_id = tag_id
        }
    }
    // 点击弹框的确定  此函数决定调用 编辑或添加
    const submitForm = async (isAdd: boolean) => {
        if (!tagFormRef?.value) return
        await tagFormRef.value.validate().then(async () => {
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
            tag_name: state.popupFormData.tag_name,
            tag_desc: state.popupFormData.tag_desc,
            create_time: +new Date(),
            update_time: +new Date(),
        }
        const [err]: any = await addTag(item)
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
            tag_id: state.popupFormData.tag_id,
            tag_name: state.popupFormData.tag_name,
            tag_desc: state.popupFormData.tag_desc,
            update_time: +new Date(),
        }
        const [err]: any = await updateTag(data)
        if (!err) {
            ElMessage({
                message: '修改成功',
                type: 'success',
            })
        }
    }

    // 弹窗关闭回调 用来清空数据
    const offPopup = () => {
        state.popupFormData.tag_name = ''
        state.popupFormData.tag_desc = ''
    }

    return {
        ...toRefs(state),
        rules,
        tagFormRef,
        tapOpenPopup,
        offPopup,
        submitForm
    }
}
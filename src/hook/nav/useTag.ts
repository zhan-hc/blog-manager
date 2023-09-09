import { reactive, onMounted, toRefs } from "vue";
import { getTagList } from '@/api/tag'
import { TagListParams, TagType } from '@/constants/types'

export default function () {

    const state: {
        page: TagListParams
        tableData: TagType[],
        total: number,
    } = reactive({
        page: {  // 分页准备的数据
            pageSize: 10,
            pageNo: 1,
            tag_name: ''
        },
        tableData: [],  // 列表数据
        total: 0,  // 列表总数据量
    })

    // 获取列表信息
    const getTagListFun = async (): Promise<void> => {
        const [_err, res]: any = await getTagList(state.page);
        state.total = res.total
        state.tableData = res.tagList; // 将获取到的列表数据赋值给 tableData
    }

    onMounted(async () => {
        await getTagListFun();
    });
    return {
        ...toRefs(state),
        getTagListFun
    }
}
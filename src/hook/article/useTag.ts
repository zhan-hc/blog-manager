import { onMounted, reactive, toRefs } from 'vue'
import { TagType } from '@/constants/types';
import { getTagList } from '@/api/tag';
export default function () {

  const state: {
    tagList: TagType[];
    total: number;
  } = reactive({
    tagList: [],
    total: 0
  })

  onMounted(async () => {
    const [err, { tagList = [], total = 0 }]:any = await getTagList()
    state.tagList = tagList
    state.total = total
  })

  return {
    ...toRefs(state)
  }
}
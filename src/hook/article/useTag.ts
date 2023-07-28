import { onMounted, reactive, toRefs } from 'vue'
import { TagType } from '@/constants/types';
import { getTagList } from '@/api/tag';
export default function () {

  const state: {
    tagList: TagType[]
  } = reactive({
    tagList: []
  })

  onMounted(async () => {
    const [err, { tagList = [] }]:any = await getTagList()
    state.tagList = tagList
  })

  return {
    ...toRefs(state)
  }
}
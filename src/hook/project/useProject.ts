import { getProjectList } from "@/api/project";
import { reactive, toRefs } from "vue";

export default function () {
  const state = reactive({
    searchData: {
      project_name: '',
      pageSize: 10,
      pageNo: 1,
    },
    projectData: {
      total: 0,
      projectList: []
    }
  })

  const getProjectData = async () => {
    const [_err, { total = 0, projectList = [] }]: any = await getProjectList(state.searchData)
    state.projectData.total = total
    state.projectData.projectList = projectList
  }

  return {
    ...toRefs(state),
    getProjectData
  }
}
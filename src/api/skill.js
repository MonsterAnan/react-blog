import { GET, POST,PUT,DEL } from "../utils/http"

const api = {
    skill: '/api/admin/skill',
    updateSkill:(id)=> `/api/admin/skill/${id}`
}


/**
 * Get skill List
 * @param {keywod,pageindex,pagesize} params 
 */
export  function getskillList (params) {

    return GET(api.skill,params);
}

/**
 * Add skill for skillList
 * @param {paramsData} params 
 */
export  function addskill (params) {

    return POST(api.skill, params);
}

/**
 * Edit skill for skillList
 * @param {paramsData} params 
 */
export  function updateskillList (id,params) {
    
    return PUT(api.updateSkill(id), params);
}

/**
 * Delete skill for skillList
 * @param {paramsData} params 
 */
export  function delskillList (params) {
    
    return DEL(api.skill, params);
}
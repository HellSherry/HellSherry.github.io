import{a5 as o}from"./index-a5253b46.js";const t=o.create({baseURL:"http://121.37.136.11:8081",timeout:5e3});t.interceptors.response.use(e=>(console.log(e),e),e=>(console.log("接口信息报错"+e),Promise.reject(e)));export{t as a};
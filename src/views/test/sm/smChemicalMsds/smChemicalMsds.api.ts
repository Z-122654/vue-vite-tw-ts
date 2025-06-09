import { defHttp } from '/@/utils/http/axios';

enum Api {
	data = "mis-sm-common/sm/smChemicalMsds/data",
	allData = "mis-sm-common/sm/smChemicalMsds/allData",
	save = "mis-sm-common/sm/smChemicalMsds/save",
	get = "mis-sm-common/sm/smChemicalMsds/get",
	remove = "mis-sm-common/sm/smChemicalMsds/remove",
	import = 'mis-sm-common/sm/smChemicalMsds/import',
	export = 'mis-sm-common/sm/smChemicalMsds/export',
}
/**
 * 导出api
 */
export const getExportUrlSmChemicalMsds = Api.export;

/**
 * 导入api
 */
export const getImportUrlSmChemicalMsds = Api.import;

/**
 * 查询列表
 * @param params
 */
export const allDataSmChemicalMsds = (params) => {
	return defHttp.get({url: Api.allData, params});
}

/**
 * 查询所有
 * @param params
 */
export const dataSmChemicalMsds = (params) => {
	return defHttp.get({url: Api.data, params});
}

/**
 * 保存或者更新
 * @param params
 */
export const saveSmChemicalMsds = (params, isUpdate) => {
	return defHttp.post({url: Api.save, params});
}

/**
 * 查询详情
 * @param params
 */
export const getSmChemicalMsds = (params) => {
	return defHttp.get({url: Api.get, params});
}

/**
 * 删除
 * @param params
 */
export const removeSmChemicalMsds = (params, handleSuccess) => {
	return defHttp.delete({url: Api.remove, data: params}).then(() => {
		handleSuccess();
	});
}
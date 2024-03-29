import moment from "moment";
import md5 from "js-md5";

export * from "./request";
export * from "./apis";
export * from "./responseHandler";

/**
 * 播放单词读音
 * @param word 单词
 */
export const playWordVoice = (word: string) => {
	const VOCIE_URL = "http://dict.youdao.com/dictvoice?type=0&audio=";
	const vocie = new Audio(VOCIE_URL + word);
	vocie.play();
};

/**
 * url参数转json对象
 * @param url url地址
 * @returns 参数json对象
 */
export const parseUrlToJson = (
	url: string
): Record<string, string | number> => {
	const arr = url.split("?")[1].split("&"); //先通过？分解得到？后面的所需字符串，再将其通过&分解开存放在数组里
	const obj: Record<string, string | number> = {};
	for (const i of arr) {
		const key: string = i.split("=")[0];
		const value: string = i.split("=")[1];
		const trueValue = Number(value);
		if (!isNaN(trueValue)) {
			obj[key] = trueValue; //对数组每项用=分解开，=前为对象属性名，=后为属性值
		} else {
			obj[key] = value;
		}
	}
	return obj;
};

/**
 * json对象转url参数
 * @param obj 参数json对象
 * @returns url参数
 */
export const parseJsonToUrl = (obj: Record<string, any>): string =>
	Object.keys(obj)
		.map(function (key: string) {
			return key + "=" + encodeURIComponent(obj[key]);
		})
		.join("&");

/**
 * 将对象部分字段md5加密
 * @param obj 任意对象
 * @param md5Fields 需要md5的字段
 * @returns 转换后的对象
 */
export const md5Object = (
	obj: Record<string, any>,
	md5Fields: string[]
): Record<string, any> => {
	const newObj: Record<string, any> = {};
	for (const key in obj) {
		if (md5Fields.includes(key)) {
			newObj[key] = md5(obj[key]);
		} else {
			newObj[key] = obj[key];
		}
	}
	return newObj;
};

export const formatTime = (
	time: string | undefined,
	formatter = "yyyy-MM-DD HH:mm:ss"
): string => {
	if (!time) return "";
	const momentObj = moment(time);
	return momentObj.format(formatter);
};

/**
 * 生成随机16进制颜色
 * @returns 随机十六进制颜色
 */
export const getRandomColor = () => {
	//随机生成十六进制颜色
	let hex = Math.floor(Math.random() * 16777216).toString(16);
	//生成ffffff以内16进制数
	while (hex.length < 6) {
		//while循环判断hex位数，少于6位前面加0凑够6位
		hex = "0" + hex;
	}
	return "#" + hex; //返回‘#'开头16进制颜色
};

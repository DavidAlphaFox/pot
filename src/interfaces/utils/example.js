import request from './utils/request';
import { get } from '../windows/main';

// 必须向外暴露info
export const info = {
    // 接口中文名称
    name: '示例翻译',
    // 接口支持语言及映射
    supportLanguage: {
        auto: 'auto',
        'zh-cn': 'zh',
        en: 'en',
    },
    // 接口需要配置项(会在设置中出现设置项来获取)
    needs: [
        {
            config_key: 'example_apiid', // 配置项在配置文件中的代号
            place_hold: 'ApiId', // 配置项没有填写时显示的提示信息
            display_name: '示例翻译ApiId', // 配置项名称
        },
        {
            config_key: 'example_apikey',
            place_hold: 'ApiKey',
            display_name: '示例翻译ApiKey',
        },
    ],
};
//必须向外暴露translate
export async function translate(text, from, to) {
    // 获取语言映射
    const { supportLanguage } = info;
    // 获取设置项
    const apiid = get('example_apiid') ?? '';
    const apikey = get('example_apikey') ?? '';
    // 检查设置
    if (apiid == '' || apikey == '') {
        return '请先配置apiid或apikey';
    }
    // 检查语言支持
    if (!(to in supportLanguage) || !(from in supportLanguage)) {
        return '该接口不支持该语言';
    }
    // 完成翻译过程
    // ......
    // 使用request发送请求 示例代码如下
    let proxy = get('proxy') ?? '';
    let res = await request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apikey}`,
        },
        query: {
            source: supportLanguage[from],
            target: supportLanguage[to],
        },
        // body一定要stringify
        body: JSON.stringify({
            text: text,
        }),
        proxy: proxy,
    });
    let result = JSON.parse(res);
    // 返回翻译结果
    // return target
}
// 编写完成后请在index.js中暴露接口

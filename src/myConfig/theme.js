/**
 * 主题色的切换
 */

// 引入字体变量插件
import cssVars from 'css-vars-ponyfill';

const baseSize = { '--font-size-large-x': '22px', '--font-size-large': '18px', '--font-size-medium': '14px', '--font-size-medium-x': '16px', '--font-size-small-s': '10px', '--font-size-small': '12px', };

export const themeOptions = {
    // 深色
    dark: {
        ...baseSize,
        '--color1': '#fff',
        '--bg1': '#222'
    },
    // 浅色
    light: {
        ...baseSize,
        '--color1': '#ff758c',
        '--bg1': '#667eea'
    }
};
/**
 * @param {*} theme 指定换肤的key
 */
export const initTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme ? 'light' : 'dark');
    cssVars({
        watch: true,
        // variables 自定义属性名/值对的集合
        variables: themeOptions[theme],
        // 当添加，删除或修改其<link>或<style>元素的禁用或href属性时，ponyfill将自行调用
        onlyLegacy: false, // false 默认将css变量编译为浏览器识别的css样式 true 当浏览器不支持css变量的时候将css变量编译为识别的css
    });
};
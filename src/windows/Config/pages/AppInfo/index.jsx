import { writeText } from '@tauri-apps/api/clipboard';
import { notification, app } from '@tauri-apps/api';
import { emit } from '@tauri-apps/api/event';
import React, { useState, useEffect } from 'react';
import { Button, Box } from '@mui/material';
import ConfigList from '../../components/ConfigList';
import ConfigItem from '../../components/ConfigItem';
import './style.css';

export default function AppInfo() {
    const [version, setVersion] = useState();
    const [tauriVersion, setTauriVersion] = useState();

    useEffect(() => {
        app.getVersion().then((v) => {
            setVersion(v);
        });
        app.getTauriVersion().then((v) => {
            setTauriVersion(v);
        });
    }, []);

    // 复制内容
    function copy(who) {
        writeText(who).then((_) => {
            setCopyed(true);
        });
    }

    function checkUpdate() {
        emit('tauri://update').then((_) => {});
    }

    return (
        <ConfigList>
            <Box className='logo'>
                <img
                    src='icon.png'
                    className='logo'
                />
            </Box>

            <ConfigItem label='应用简介'>
                <ul>
                    <li>应用名称:&nbsp;&nbsp;pot</li>
                    <li>
                        作者:&nbsp;&nbsp;
                        <a
                            href='https://github.com/Pylogmon'
                            target='_blank'
                        >
                            @Pylogmon
                        </a>
                    </li>
                    <li>
                        开源协议:&nbsp;&nbsp;
                        <a
                            href='https://github.com/Pylogmon/pot/blob/master/LICENSE'
                            target='_blank'
                        >
                            GPL-3.0
                        </a>
                    </li>
                    <li>描述:&nbsp;&nbsp;pot是一款跨平台的划词翻译软件</li>
                </ul>
            </ConfigItem>
            <ConfigItem label='应用版本'>
                <ul>
                    <li>Pot:&nbsp;&nbsp;{version}</li>
                    <li>Tauri:&nbsp;&nbsp;{tauriVersion}</li>
                    <li>
                        <Button
                            size='small'
                            onClick={() => copy(`pot:${version}  Tauri:${tauriVersion}`)}
                        >
                            一键复制
                        </Button>
                    </li>
                </ul>
                <Button
                    onClick={checkUpdate}
                    variant='outlined'
                    size='small'
                >
                    检查更新
                </Button>
                &nbsp;
                <a
                    href='https://github.com/Pylogmon/pot/releases'
                    target='_blank'
                >
                    <Button
                        variant='outlined'
                        size='small'
                    >
                        前往下载
                    </Button>
                </a>
            </ConfigItem>
            <ConfigItem label='相关站点'>
                <ul>
                    <li>
                        官网:&nbsp;&nbsp;
                        <a
                            href='https://pot.pylogmon.cn'
                            target='_blank'
                        >
                            https://pot.pylogmon.cn
                        </a>
                    </li>
                    <li>
                        Github:&nbsp;&nbsp;
                        <a
                            href='https://github.com/Pylogmon/pot'
                            target='_blank'
                        >
                            https://github.com/Pylogmon/pot
                        </a>
                    </li>
                </ul>
            </ConfigItem>
            <ConfigItem label='使用反馈'>
                <ul>
                    <li>
                        提交Bug:&nbsp;&nbsp;
                        <a
                            href='https://github.com/Pylogmon/pot/issues/new?template=bug.yml'
                            target='_blank'
                        >
                            提交Issue
                        </a>
                    </li>
                    <li>
                        需求建议:&nbsp;&nbsp;
                        <a
                            href='https://github.com/Pylogmon/pot/issues/new?template=feature.yml'
                            target='_blank'
                        >
                            提交Issue
                        </a>
                    </li>
                    <li>
                        联系作者:&nbsp;&nbsp;
                        <a
                            href='mailto:pylogmon@outlook.com'
                            target='_blank'
                        >
                            pylogmon@outlook.com
                        </a>
                        <br />
                    </li>
                </ul>
            </ConfigItem>
            <ConfigItem label='社区交流'>
                <ul>
                    <li>QQ群:&nbsp;&nbsp;767701966</li>
                </ul>
            </ConfigItem>
        </ConfigList>
    );
}

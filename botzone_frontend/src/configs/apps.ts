import type { AppData } from '~/types'
import VSCode from '~/components/apps/VSCode.vue'

export const apps: AppData[] = [
  {
    id: 'launchpad',
    title: 'Launchpad',
    desktop: false,
    img: 'imgs/icons/launchpad.png',
  },
  {
    id: 'bear',
    title: 'Bear',
    desktop: true,
    show: false,
    width: 860,
    height: 500,
    img: 'imgs/icons/bear.png',
    // content: null
  },
  {
    id: 'safari',
    title: 'Safari',
    desktop: true,
    show: false,
    width: 1024,
    minWidth: 375,
    minHeight: 200,
    img: 'imgs/icons/safari.png',
    // content: <Safari />
  },
  {
    id: 'vscode',
    title: 'VSCode',
    desktop: true,
    show: true,
    img: 'imgs/icons/vscode.png',
    content: VSCode,
  },
  {
    id: 'facetime',
    title: 'FaceTime',
    desktop: true,
    show: false,
    img: 'imgs/icons/facetime.png',
    height: 530,
    // content: <FaceTime />
  },
  {
    id: 'terminal',
    title: 'Terminal',
    desktop: true,
    show: false,
    img: 'imgs/icons/terminal.png',
    // content: <Terminal />
  },
  {
    id: 'email',
    title: 'Mail',
    desktop: false,
    img: 'imgs/icons/mail.png',
    // link: '',
  },
  {
    id: 'github',
    title: 'Github',
    desktop: false,
    img: 'imgs/icons/github.png',
    link: 'https://github.com/cosmoscatts/botzone',
  },
]

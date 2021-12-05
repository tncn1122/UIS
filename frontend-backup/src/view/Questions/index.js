import React from 'react'
import { Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import styles from './style.module.scss'

const { DirectoryTree } = Tree
export default function Questions() {
  const onSelect = (keys, info) => {
    console.log('Trigger Select', keys, info)
  }

  const onExpand = () => {
    console.log('Trigger Expand')
  }
  return (
    <div className={styles.quesions}>
      <div className="question__tree-container">
        <div className="question__tree">
          <div className="question__label">Các câu hỏi thường gặp</div>
          <DirectoryTree
            multiple
            switcherIcon={<DownOutlined />}
            showIcon={false}
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
          />
        </div>
      </div>

      <div className="answer-container">
        <div className="answer"></div>
      </div>
    </div>
  )
}

const treeData = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      {
        title: 'leaf 0-0',
        key: '0-0-0',
        children: [
          { title: 'leaf 1-0', key: '0-0-0-0', isLeaf: true },
          { title: 'leaf 1-1', key: '0-0-0-1', isLeaf: true },
        ],
      },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
]

import React, { useState, useEffect } from 'react'
import { Table } from 'antd'
import styles from './style.module.scss'

export default function ContestRanking() {
  useEffect(() => {
    console.log(`-------- Contest Deailt: ranking mounted`)
  }, [])

  return (
    <div className={styles.rankings}>
      <Table columns={columns} dataSource={data} bordered size="middle" />
    </div>
  )
}

const columns = [
  {
    title: 'Hạng',
    dataIndex: 'order',
    key: 'order',
    width: 50,
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    width: 150,
  },
  {
    title: 'Bài thi',
    dataIndex: 'contest',
    key: 'contest',
    width: 400,
    children: [
      {
        title: '1',
        dataIndex: 'contest1',
        key: 'contest1',
        width: 100,
      },
      {
        title: '2',
        dataIndex: 'contest2',
        key: 'contest1',
        width: 100,
      },
      {
        title: '3',
        dataIndex: 'contest3',
        key: 'contest1',
        width: 100,
      },
      {
        title: '4',
        dataIndex: 'contest4',
        key: 'contest1',
        width: 100,
      },
    ],
  },
]

const data = [
  {
    key: 1,
    order: 1,
    username: 'User',
    contest1: 10,
    contest2: 10,
    contest3: 10,
  },
  {
    key: 2,
    order: 2,
    username: 'User',
    contest1: 10,
    contest2: 10,
    contest3: 10,
  },
  {
    key: 3,
    order: 3,
    username: 'User',
    contest1: 10,
    contest2: 10,
    contest3: 10,
  },
]

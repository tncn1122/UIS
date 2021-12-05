import React from 'react'
import { Table, Input } from 'antd'
import { IoIosSearch } from 'react-icons/io'
import { TEXT_UI_RANKING } from 'config'
import styles from './style.module.scss'

export const DATA_RANKING = [
  {
    key: '01',
    rating: 1,
    username: 'Team1',
    tongdiem: '100',
  },
  {
    key: '02',
    rating: 2,
    username: 'Team2',
    tongdiem: '90',
  },
  {
    key: '03',
    rating: 3,
    username: 'Team3',
    tongdiem: '80',
  },
  {
    key: '04',
    rating: 4,
    username: 'Team4',
    tongdiem: '75',
  },
  {
    key: '05',
    rating: 5,
    username: 'Team5',
    tongdiem: '70',
  },
  {
    key: '06',
    rating: 6,
    username: 'Team6',
    tongdiem: '60',
  },
]

const columns = [
  {
    title: 'Hạng',
    dataIndex: 'rating',
    key: 'rating',
    render: (text) => <a>{text}</a>,
    align: 'center',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    align: 'center',
  },
  {
    title: 'Tổng điểm',
    dataIndex: 'tongdiem',
    key: 'tongdiem',
    align: 'center',
  },
]

export default class RankingView extends React.Component {
  render() {
    return (
      <div className={styles.ranking}>
        <div className={styles.rankingTable}>
          <h2>{TEXT_UI_RANKING.SCORE_2021}</h2>
          <Input
            className={styles.searchBar}
            size="large"
            addonAfter={
              <div className={styles.btnSearch}>
                <IoIosSearch />
              </div>
            }
            placeholder={TEXT_UI_RANKING.FILTER_PLACEHOLDER}
          />
          <Table columns={columns} dataSource={DATA_RANKING} align="center" filtered />
        </div>
      </div>
    )
  }
}

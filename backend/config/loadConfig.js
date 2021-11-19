import _ from 'lodash'
import configstore from 'configstore'
import { ENV_LOCAL } from '../config'
import appConfig from './appConfig'

const config = new configstore(process.env.NODE_ENV || ENV_LOCAL);

const loadConf = async () => {
    const extraConfig = {}
    config.set(_.merge(appConfig, extraConfig));
}

module.exports = {
    config,
    loadConf
}
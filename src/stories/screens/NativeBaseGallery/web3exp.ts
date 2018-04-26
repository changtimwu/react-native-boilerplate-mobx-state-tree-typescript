import Web3 from 'web3'
// import * as W3T from 'web3/types'


const DEFProvider = "https://kovan.infura.io/kfXXAihe0rANOn4PQFJw"
class Web3Exp {
    private web3: Web3
    constructor(url?: string) {
        if (!url)
            url = DEFProvider
        this.web3 = new Web3(url)
    }

    async ethsysInfo() {
        let w3 = this.web3
        console.log('default block=', w3.eth.defaultBlock)
        console.log('default account=', w3.eth.defaultAccount)
        console.log('protocol version=', await w3.eth.getProtocolVersion())
        console.log('isSyncing=', await w3.eth.isSyncing())
    }

    async netinfo() {
        let w3 = this.web3
        let peercnts = await w3.eth.net.getPeerCount()
        console.log('peer counts=', peercnts)
        /*
        let nettype = await w3.eth.net.getNetworkType()
        console.log('network type=', nettype)*/
    }
    async blkinfo() {
        let w3 = this.web3
        const blkobj = await w3.eth.getBlock('latest')
        console.log('blkobj=', blkobj)
        //blkobj.transactions = null
        //this.setState({ blockInfo: JSON.stringify(blkobj) })
    }
}
export default Web3Exp


const MerkleVerify = artifacts.require('MerkleVerify');
const { createHash } = require('crypto');

contract('MerkleVerify', async accounts => {

  let instance = null
  let testData = [{
    id: 'Test 1',
    root: '0xA34A076E8E9FBB20C64E05C27751FB757C318AB8D61644A605F346BCDA713A59',
    leaves: [
      '0x116A57394307C0B3E9E6E2795630BAD20ACC03A22B8F537EC248EC3C0950466A',
      '0xFA47722210D4F724F940D77B2F0FFCF9DB953C8E8AE44DF7606100B4C965CCC4',
      '0xC7F5C716D2F7DE0CB2041D670D26758936D91D1A74D534ECED6C54C6C5C712E4',
      '0xB00377E70876FC02AE6D577FA058BB69D4D96DA0B0FAC30851582171818005CD',
      '0x8E9EDCB4EF988237AA40FBC54C19E3AE676C79F09F78748B2F9BF0B5F426768E',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0x562FF9005B006996B9717E9F4B124288EB2541BDF4188722B20F83B26550D370',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0x5475D4A2446AA78BA673B25F6ABB10065A46F03465853ACB280EBFC2C575509C',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    ],
  }, {
    id: 'Test 2',
    root: '0xAA7AF2ABDAA2E37785B23AEC36F73A3280FF1326595D0F976532FF8246D8536C',
    leaves: [
      '0x2F248BBBE40D5BC1EFCF85CAF7EA0C226006CD4CED5461277CC0060F44DAF773',
      '0x60601A16F49D0C6E8BD14415F466F8BD4B0981F58A15BDB06A1FA1E3DC49553F',
      '0x5DB25DB06EACEEE9A49228A902C2C1BA0910AECD149E8F1DF7FC6D368A85903F',
      '0xDDC9A03FD435B5F2DD529315B28F2FD48F10CEF8F40D9584F9F20E5C1C56AD2B',
      '0xD610601AB516421FF10B2EA9C2E5CBAFE46224BCCCF1A70BA8E05415E26745B3',
      '0x3BCE67FBCD315211CC82B6A93B21AFFD925FA418C9989437A768A4B581DE04EB',
      '0xBCA23985B853901B98F0C324D96D21AA5D27441B19570E24F9646E828B1F42B4',
      '0x57AE3AF22AB50A6723E0F56C4954E744215F1824515CF8CB0A620D9B10A0DA92',
      '0x8FA1FA34541EB9CA3781A96874D5F5F59E561F0A06265F8742B095B4032AC818',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    ],
  }, {
    id: 'Adhara 1',
    root: '0xA46E9FDC6E6DD4A659E10C1B42619CE078996AB009C8EA82BEDAEDF20C0B939A',
    leaves: [
      '0x1A3357D5D28F6BD415D64CED45D9975D7992FCEB997DA33227E0242A36792257',
      '0x67DE8C49537263FBF81A69FA214DF3903EBA581B63A9D8071DD83270887FC61D',
      '0xC028E9D66372AFA2F4AA223C3954491B07070DEFEE194525E38176B943035E2A',
      '0xAA6643E66EB89ECCD219BFA53108D92507D0561392FE85B1842877A249B05594',
      '0x77D37C81B91A5B3884CA38EA175988C1E4918B0EFFD50D9A2025669783B9DB8C',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0x5342E558FA2FE3E521249399A44869479D6766273EE8C7625005B4C6B720D9E7',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0xBDDBBFA9B35ABCC9FD32CCC01170816FA47B45A2B199F2B4481CC8CC06773932',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    ],
  }, {
    id: 'Adhara 2',
    root: '0x3E1DE1CB6F3BF92BD1E427C0AED40DECE749BCAC5BC1227E301D81621E2546FB',
    leaves: [
      '0xA1CC0888DB4A7929C3C8089E5EB93E0207EE500C1DA49DF621DFD4671EFE67F0',
      '0x9BE638965BFD84229960AF602AA414C548A08AEECCFDB8F3BDFF70439976D36E',
      '0x0BC1C1F77397E822E622C079A5DA52C5269C62919A35DB9E5F14F47E13F21FF3',
      '0xD3BA49D2572B288C03EC26B2DE83FEFA89EDEB2964C3D3D6F50272212C144F4B',
      '0x823576854AE3575BAD3F36CF6BE562C27C7E6E83F7F37E0CA3063C6C2F73B52E',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0x9C1C3793A00629405E7660BEA3D2D62F65162A6A16E2A88B91E89E6F9D8391AD',
      '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      '0xB2FA4970666B850C1234ED618CC5E8A042C5C0C049048DD0797914AFEAEA924F',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    ],
  }
  ]

  beforeEach(async () => {
    instance = await MerkleVerify.new()
  })


  it('should be able to pad leaves to a power of two', async () => {
    let td = testData[0];
    try {
      const padded = await instance.padWithZeros(td.leaves.slice(0,9), false);
      assert.equal(padded.length, td.leaves.length)
      for (let i = 0; i < padded.length; i++) {
        assert.equal(padded[i], td.leaves[i].toLowerCase())
      }
    } catch (err) {
      console.log({err})
      assert.fail('No revert expected:', err)
    }
  })

  it('should be able to generate and verify a Merkle tree proof for a transaction tree', async () => {
    for (let i=0; i<2; i++) {
      let td = testData[i];
      try {
        const data = td.leaves;
        const r = td.root;
        const root = await instance.getRoot(data);
        assert.equal(root, r.toLowerCase())
        for (let i = 0; i < 9; i++) {
          const proof = await instance.getProof(data, i);
          const result = await instance.verifyProof(root, proof, data[i]);
          assert.equal(result, true)
        }
      } catch (err) {
        console.log({err})
        assert.fail('No revert expected:', err)
      }
    }
  })

  it('should be able to generate and verify a Merkle tree proof for a derived tree', async () => {
    try {
      const data = testData[3].leaves
      const r = testData[3].root;
      const root = await instance.getRoot(data);
      assert.equal(root, r.toLowerCase())
      for (let i=0; i<9; i++) {
        const proof = await instance.getProof(data, i);
        const result = await instance.verifyProof(root, proof, data[i]);
        assert.equal(result, true)
      }
      let rehash = await instance.getRoot([r]);
      const p = '0xEE44A53441EB8FD71AB73AB2FACFD6A2DD6999AAB7CE5E57ED103C8D0327FDE5';
      assert.equal(rehash, p.toLowerCase())
    } catch (err){
      console.log({err})
      assert.fail('No revert expected:', err)
    }
  })

  it('should be able to generate and verify a multi Merkle tree proof', async () => {
    for (let i=0; i<2; i++) {
      let td = testData[i];
      try {
        const data = td.leaves;
        const r = td.root;
        const root = await instance.getRoot(data);
        assert.equal(root, r.toLowerCase())
        for (let i = 0; i < 9; i++) {
          const proof = await instance.getProof(data, i);
          const result = await instance.verifyProof(root, proof, data[i]);
          assert.equal(result, true)
        }
      } catch (err) {
        console.log({err})
        assert.fail('No revert expected:', err)
      }
    }
  })
})

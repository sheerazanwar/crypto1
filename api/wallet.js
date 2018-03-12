var bitcore= require("bitcore-lib");

exports.address=function (req,res)
{
  var brainsrc= "litecoin";
  var input= new Buffer(brainsrc);
  var hash= bitcore.crypto.Hash.sha256(input);
  var bn= bitcore.crypto.BN.fromBuffer(hash);
  var pk= new bitcore.PrivateKey(bn).toWIF();
  var addy= new bitcore.PrivateKey(bn).toAddress();
  res.json({ success: true, brainsrc: brainsrc, PrivateKey:pk});
}

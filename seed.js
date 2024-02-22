// use ?dev=xx in your params if developing locally !!

let M = Math,
  D = document,
  W = window,
  RO = M.round

let seed, dna
let blockHash = ""

let dev = new URLSearchParams(W.location.search).get('dev')

function addSeed() {

  dna = seed = W.location.pathname.split('/')[2] || W.location.href.split('/').find(t => t.includes('i0'))

  // static seed generator
  let stat = new URLSearchParams(W.location.search).get('static')
  if (stat !== null) {
    let I1 = '6fb976ab49dcec017f1e201e84395983204ae1a7c2abf7ced0a85d692e442799i0'
    seed = I1.substring(0, 2) + stat + I1.substring(2 + stat.length, I1.length)
  }


  if (seed == null || seed.length < 64) {
    const alphabet = "0123456789abcdefghijklmnopqrstuvwsyz"
    seed = new URLSearchParams(window.location.search).get("seed") || Array(64).fill(0).map(_ => alphabet[(M.random() * alphabet.length) | 0]).join('') + "i0"
  } else {
    seed = seed.substring(0, seed.length - 2)
    console.log(seed);
    let pattern = "seed="
    for (let i = 0; i < seed.length - pattern.length; ++i) {
      if (seed.substring(i, i + pattern.length) == pattern) {
        seed = seed.substring(i + pattern.length)
        break
      }
    }
  }



}

addSeed()


function cyrb128($) {
  let _ = 1779033703,
    u = 3144134277,
    i = 1013904242,
    l = 2773480762
  for (let n = 0, r; n < $.length; n++) _ = u ^ M.imul(_ ^ (r = $.charCodeAt(n)), 597399067), u = i ^ M.imul(u ^ r, 2869860233), i = l ^ M.imul(i ^ r, 951274213), l = _ ^ M.imul(l ^ r, 2716044179);
  return _ = M.imul(i ^ _ >>> 18, 597399067), u = M.imul(l ^ u >>> 22, 2869860233), i = M.imul(_ ^ i >>> 17, 951274213), l = M.imul(u ^ l >>> 19, 2716044179), [(_ ^ u ^ i ^ l) >>> 0, (u ^ _) >>> 0, (i ^ _) >>> 0, (l ^ _) >>> 0]
}

function sfc32($, _, u, i) {
  return function() {
    u >>>= 0, i >>>= 0;
    var l = ($ >>>= 0) + (_ >>>= 0) | 0;
    return $ = _ ^ _ >>> 9, _ = u + (u << 3) | 0, u = (u = u << 21 | u >>> 11) + (l = l + (i = i + 1 | 0) | 0) | 0, (l >>> 0) / 4294967296
  }
}

let mathRand = sfc32(...cyrb128(seed))

class Rnd {
  D = () => mathRand();
  N = (r, t = 0) => r + (t - r) * this.D();
  I = (r = 0, t) => (t === undefined ? (t = r, r = 0) : undefined, 0 | this.N(r, t + 1));
  B = (r) => this.D() < r;
}



const R = new Rnd()
const RI = R.I
const RD = R.D
const RN = R.N
const RB = R.B


console.log("** seed", seed, " **")

let map = (v, n, m, n2, m2) => {
  return ((v - n) / (m - n) * (m2 - n2)) + n2
}

console.log("** Generative seed helper - by The Function Gallery **");


// Long number seed random
// a less random, more true to the seed random generator

function S(n, m, x, i) {
  if (x == undefined) {
    x = m
    m = 0
  }
  n = n % N.length
  i = i || 3
  return map(parseInt(N.substr(n, i), 10), 0, M.pow(10, i), m, x)
}



///// DNA and binary seed
// DNA works with S() - as the seed mutates

let N = GLN(seed)
let bin = BIN(N)

// fire this to get recurring DNA updates
// if u don't call getDNA, DNA will remain static as will seed long number random generator S()
// will will then be a normal deterministic random generator

// getDNA default update is 5 mins, not point in making it shorter
// because blocks update every 10 min on ave.

let getDNA = (t) => {
  t = t || 300
  blockhash = setDNA()
  setInterval(setDNA, t * e3)
}


// gets latest blockhash and seeds it into the DNA

async function setDNA() {
  try {
    const r = await getEndpoint('blockhash');

    let d = JSON.parse(r);
    // if (test && blockHash == r) {
    //
    // }
    const startIndex = Math.max(0, d.length - 16);
    const endIndex = Math.max(8, d.length);

    dna = d.slice(startIndex, endIndex) + dna.slice(8, d.length);
    //console.log("DNA", dna);

    // generate a new long number
    N = GLN(dna);
    return r;
  } catch (e) {
    console.log('DNA fetch fail')
    return blockHash;
    //throw e;
  }
}


// calls the blockhash endpoint
// but can also be used as a helper function to call
// any other Ordinal endpoints

function getEndpoint(url) {
  let U = dev ? 'https://ordinals.com' : '';
  U = U + "/r/" + url;
  return fetch(U)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Fetch fail: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .catch(error => {
      console.error(error, "endpoint fetch fail");
    });
}




// a log number is generated from the seed

function GLN(n) {
  let l = ""
  for (var i = 0; i < n.length; i += 1) {

    let h = getHash(hash32(n.substr(i, 2), 1))
    h = h.toString().substr(2, h.length)
    l += h
  }
  return l
}


function getHash(v) {
  let H = v.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
  return M.abs(H)

}

function hash32(str, v) {
  var i, l,
    hval = 0x811c9dc5
  for (i = 0, l = str.length; i < l; i++) {
    hval ^= str.charCodeAt(i)
    hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24)
  }
  if (v) {
    return ("00000" + (hval >>> 0).toString(16)).substr(-6)
  }
  return hval >>> 0
}


// generate binary
// here used for seed but can be used for any number

function BIN(n) {

  let out = ""
  for (let i = 0; i < n.length; i++) {
    var e = n[i].charCodeAt(0)
    var s = ""
    do {
      var a = e % 2
      e = (e - a) / 2
      s = a + s
    } while (e != 0)
    while (s.length < 8) {
      s = "0" + s
    }
    out += s
  }
  return out
}


// check if an index in the binary is positive or negative

let isBin = (n) => {
  return Number(bin.substr(n % (bin.length - 1), 1))
}


let SR = (n, m, x, i) => RO(S(n, m, x, i))


async function dFn(ordId) {


    let U = dev ? 'https://ordinals.com/content/' : ''
    let fflateUrl = U + '2dbdf9ebbec6be793fd16ae9b797c7cf968ab2427166aaf390b90b71778266abi0';

async function fetchFlate(url) {
    try {
      let r = await fetch(url);
      return (await r.text()).split("\n")[28];
    } catch (e) {
      console.log(`Failed fetch: ${e.message}`);
      return null;
    }
  }


  ffS = await fetchFlate(fflateUrl)

  OI = await fetch(ordId);
  OT = `${await OI.text()}`;

  // deflate P5

  (function () {
    let ff = (new Function(`
    return (function() {
      ${ffS}
      return { gunzipSync : sr, strFromU8 : ur };
    })();
  `))();
    CC = ff.strFromU8(ff.gunzipSync(new Uint8Array(Array.from(atob(OT)).map((char) => char.charCodeAt(0)))));
    CS = D.createElement('script');
    CS.innerHTML = CC;
    D.body.appendChild(CS);
  })();


}
//// CSS


  const style = D.head.appendChild(document.createElement('style'))

  style.textContent = `

  html, body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
    font-family: courier;
  }

  canvas {
    display: block;
  }

`;

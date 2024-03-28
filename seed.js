// use ?dev=1 in your params if developing locally !!
// this will add the full reference to ordinals.com

// use static=xxxxx to

let M = Math,
  D = document,
  W = window,
  RO = M.round

let seed, dna
let blockHash = ""

let ord = 'https://ordinals.com'
let con = '/content/'
let dev = new URLSearchParams(W.location.search).get('dev')
let U = dev ? ord + con : con
let ordR = ord + '/r/';
let fflateUrl = U + 'f815bd5c566c6e46de5cdb6ccb3a7043c63deeba61f4234baea84b602b0d4440i0';
let p5Url = U + 'cc5cf94da24c1f6f0d435ccca78c24e98ca30adb1f3b7c81b9ab28ceb6cb628fi0'; // p5.js 1.9.0
console.log("base url: ", U);

// thanks to the colorBlocks for this solution

const gzlib = {
  load: async (t, e, ev) => {
    const a = await (await fetch(t)).text(),
      c = new Blob([a], {
        type: "application/javascript"
      }),
      n = URL.createObjectURL(c),
      i = await import(n),
      o = await (await fetch(e)).text(),
      d = i.strFromU8(i.decompressSync(i.strToU8(atob(o), !0))),
      p = D.createElement("script");
    p.innerHTML = d, D.head.appendChild(p), D.dispatchEvent(new Event(ev))
  }
};

let unzipLib = (zipLibUrl, e) => {
  e = e || zipLibUrl
  gzlib.load(fflateUrl, zipLibUrl, e);
  W.addEventListener(e, () => {
    console.log('--->', e);
  })
}


// decompress

let dFn = (compressId, loc) => {
  compressId = loc? compressId: U + compressId
  unzipLib(compressId)
}



let p5 = () => {

  let s = D.getElementsByTagName('script');

  for (let i = 0; i < s.length; i++) {
    let currentScript = s[i];
    let src = currentScript.getAttribute('src');

    if (src && src.includes('?p5')) {
      unzipLib(p5Url, 'p5Loaded');
      console.log("** P5js helper - by The Function Gallery **");
      break;
    }
  }
}


let addSeed= () => {

  seed = W.location.href.split('/').find(t => t.includes('i0')) || W.location.pathname.split('/')[2]

  // static seed generator
  let stat = new URLSearchParams(W.location.search).get('static')
  if (stat !== null) {
    let I1 = '6fb976ab49dcec017f1e201e84395983204ae1a7c2abf7ced0a85d692e442799i0'
    seed = I1.substring(0, 2) + stat + I1.substring(2 + stat.length, I1.length)
  }


  if (seed == null || seed.length < 64) {
    const alphabet = "0123456789abcdefghijklmnopqrstuvwsyz"
    seed = new URLSearchParams(W.location.search).get("seed") || Array(64).fill(0).map(_ => alphabet[(M.random() * alphabet.length) | 0]).join('') + "i0"
  } else {
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
p5()

dna = seed.substring(0, seed.length - 2)

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
    let l = ($ >>>= 0) + (_ >>>= 0) | 0;
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

console.log("** seed helper - by The Function Gallery **");


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
// if u don't call getDNA, DNA will remain static as will seed long number random pointer S()
// will will then be a normal deterministic random generator

// getDNA default update is 5 mins, no point in making it shorter
// because blocks update every 10 min on average.

let getDNA = (t) => {
  t = t || 300
  blockhash = setDNA()
  setInterval(setDNA, t * 10e3)
}

let dnaEndpoint = 'blockhash';

// gets latest blockhash and seeds it into the DNA

async function setDNA() {
  try {
    const r = await getEndpoint(dnaEndpoint);

    let d = JSON.parse(r);

    const startIndex = Math.max(0, d.length - 16);
    const endIndex = Math.max(8, d.length);

    dna = d.slice(startIndex, endIndex) + dna.slice(8, d.length);

    N = GLN(dna);
    return r;
  } catch (e) {
    console.log('DNA fail')
    return blockHash;
    //throw e;
  }
}


// helper function to call Ordinal endpoints

function getEndpoint(url) {

  let U = ordR + url;
  return fetch(U)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Fetch fail: ${response.status} ${response.statusText}`);
      }
      return response.text();
    })
    .catch(error => {
      console.error(error, "endpoint fail");
    });
}



// a log number is generated from the seed

function GLN(n) {
  let l = ""
  for (let i = 0; i < n.length; i += 1) {

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
  let i, l,
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
    let e = n[i].charCodeAt(0)
    let s = ""
    do {
      let a = e % 2
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




async function getInfo(ordId){
      let res = await fetch(ordR + 'inscription/' + ordId);
      let info = await res.json();
      return info;
}


//// CSS


const style = D.head.appendChild(document.createElement('style'))

style.textContent = `

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #000;
  }

  body {
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

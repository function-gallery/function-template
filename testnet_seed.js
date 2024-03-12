// use ?dev=1 in your params if developing locally !!
// this will add the full reference to ordinals.com

// use static=xxxxx to

let M = Math,
  D = document,
  W = window,
  RO = M.round

let seed, dna
let blockHash = ""

let ord = 'https://testnet.ordinals.com'
let con = '/content/'
let dev = new URLSearchParams(W.location.search).get('dev')
let U = dev ? ord + con : con
let ordR = ord + '/r/';
let fflateUrl = U + '657973995aa2a47c3fe02debb22405dadf6b49148d97027627bced89a73f408fi0';
let p5Url = U + 'd1fc9ee2d1877927643978045b80078d8e5b2dd49e04d309f5453c8dc4ac269fi0'
console.log("-----", U);

const gzlib = {
  load: async (t, e) => {
    const a = await (await fetch(t)).text(),
      c = new Blob([a], {
        type: "application/javascript"
      }),
      n = URL.createObjectURL(c),
      i = await import(n),
      o = await (await fetch(e)).text(),
      d = i.strFromU8(i.decompressSync(i.strToU8(atob(o), !0))),
      p = document.createElement("script");
    p.innerHTML = d, document.head.appendChild(p), document.dispatchEvent(new Event("gzlibLoaded"))
  }
};


(function() {

  var scripts = D.getElementsByTagName('script');

  for (var i = 0; i < scripts.length; i++) {
    var currentScript = scripts[i];
    var scriptSrc = currentScript.getAttribute('src');

    if (scriptSrc && scriptSrc.includes('?p5')) {
      console.log("Load P5");
      gzlib.load(fflateUrl, p5Url);
      W.addEventListener('gzlibLoaded', () => {
        console.log("** TESTNET P5js helper - by The Function Gallery **");
      })
      break;
    }
  }
}());






function addSeed() {

  seed = W.location.href.split('/').find(t => t.includes('i0')) || W.location.pathname.split('/')[2]

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

console.log("** TESTNET seed helper - by The Function Gallery **");


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
  setInterval(setDNA, t * e3)
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

    // generate a new long number
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



function Fn(u) {
  u = U + u
  console.log("load", u);
  let F = D.createElement('script');
  F.src = u;
  D.head.appendChild(F)
}
// return new Promise((y, n) => {F.onload = y;F.onerror = n;D.head.appendChild(F);})};



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


// decompress

async function dFn(compressId) {
  try {

    // let U = dev ? ordC : con;
    // let U2 = dev2 ? ordC : con;
    let fflateUrl = U + '2dbdf9ebbec6be793fd16ae9b797c7cf968ab2427166aaf390b90b71778266abi0';

    //ordId.includes('i0'))
    let compressUrl = compressId.includes('i0') ? U + compressId : compressId

    async function fetchFlate(url) {
      try {
        let r = await fetch(url);
        return (await r.text()).split("\n")[28];
      } catch (e) {
        console.log(`Failed fetch: ${e.message}`);
        return null;
      }
    }

    async function fetchOrd(url) {
      try {
        let r = await fetch(url);
        return await r.text();
      } catch (e) {
        console.log(`Failed ord fetch: ${e.message}`);
        return null;
      }
    }

    const ffS = await fetchFlate(fflateUrl);
    const OT = await fetchOrd(compressUrl);

    (function() {
      let ff = new Function(`
        return (function() {
          ${ffS}
          return { gunzipSync: sr, strFromU8: ur };
        })();
      `)();

      if (ff && ff.gunzipSync && ff.strFromU8) {
        let CC = ff.strFromU8(ff.gunzipSync(new Uint8Array(Array.from(atob(OT)).map((char) => char.charCodeAt(0)))));
        let CS = document.createElement('script');
        CS.innerHTML = CC;
        document.head.appendChild(CS); // This line is now inside the onload handler

      } else {
        console.error('gunzip issue');
      }
    })();

  } catch (error) {
    console.error("dFn Error:", error);
  }
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

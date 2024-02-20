// use ?dev=xx in your params if developing locally !!

(async function () {
  let W = window, D = document;
  let dev = new URLSearchParams(W.location.search).get('dev')
  let U = dev ? 'https://ordinals.com/content/' : ''
  let fflateUrl = U + '2dbdf9ebbec6be793fd16ae9b797c7cf968ab2427166aaf390b90b71778266abi0';

  async function fetchFlate(url) {
      try {
        let r = await fetch(url);

        // if (!r.ok) {
        //   throw new Error(`Failed fetch: ${r.status}`);
        // }

        return (await r.text()).split("\n")[28];
      } catch (e) {
        console.log(`Failed fetch: ${e.message}`);
        return null;
      }
  }

  ffS = await fetchFlate(fflateUrl)
  p5r = await fetch(U + '255ce0c5a0d8aca39510da72e604ef8837519028827ba7b7f723b7489f3ec3a4i0');
  p5txt = `${await p5r.text()}`;

  (function () {
    let p5Code; // create local variables for function()
    let ff = (new Function(`return (function() { ${ffS}
    return { gunzipSync : sr, strFromU8 : ur }; })();`))();

    p5Code = ff.strFromU8(ff.gunzipSync(new Uint8Array(Array.from(atob(p5txt)).map((char) => char.charCodeAt(0)))));
    p5Scr = D.createElement('script');
    p5Scr.innerHTML = p5Code;
    D.body.appendChild(p5Scr);
  })();

})();


console.log("** P5js helper - by The Function Gallery **");

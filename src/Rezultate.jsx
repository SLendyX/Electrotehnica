import React from "react";

export default function({inputArray, category}){

let rezultate = {};
if (category === "trgol") {
    const get = name => Number(inputArray.find(obj => obj.name === name)?.value || 0);
    const U10 = get("U10"), I10 = get("I10"), P10 = get("P10"), U20 = get("U20");
    const U1k = get("U1k"), I1k = get("I1k"), P1k = get("P1k");
    let Sn = get("Sn"), U1n = get("U1n"), U2n = get("U2n"), I1n = get("I1n"), I2n = get("I2n");
        if (!Sn && U1n && I1n) {
            Sn = U1n * I1n;
        } else if (!Sn && U2n && I2n) {
            Sn = U2n * I2n;
        }
        if (!I1n && Sn && U1n) {
            I1n = Sn / U1n;
        }
        if (!I2n && Sn && U2n) {
            I2n = Sn / U2n;
        }
        if (!U1n && Sn && I1n) {
            U1n = Sn / I1n;
        }
        if (!U2n && Sn && I2n) {
            U2n = Sn / I2n;
        }
    if ([U10, I10, P10, U20, U1k, I1k, P1k].every(x => x !== 0)) {
        const kT = U10 / U20;
        const cos_phi10 = P10 / (U10 * I10);
        const sin_phi10 = Math.sqrt(1 - cos_phi10 ** 2);
        const Iw = I10 * cos_phi10;
        const Iu = I10 * sin_phi10;
        const cos_phi1k = P1k / (U1k * I1k);
        const Zk = U1k / I1k;
        const Rk = P1k / (I1k ** 2);
        const Xk = Math.sqrt(Zk ** 2 - Rk ** 2);
        const uk = U1k / U1n * 100;
        const uka = (Rk * I1n) / U1n * 100;
        const ukr = (Xk * I1n) / U1n * 100;
        rezultate = { kT, cos_phi10, sin_phi10, Iw, Iu, cos_phi1k, Zk, Rk, Xk, uk, uka, ukr };
    }
}
if (category === "monofaz"){
    const get = name => inputArray.find(obj => obj.name === name)?.value || 0;
    const I1 = get("I1"), I2 = get("I2"), U2 = get("U2"), P1 = get("P1");
    let Sn = get("Sn"), U1n = get("U1n"), U2n = get("U2n"), I1n = get("I1n"), I2n = get("I2n"), fi2 = get("cos ϕ2");
        if (!Sn && U1n && I1n) {
            Sn = U1n * I1n;
        } else if (!Sn && U2n && I2n) {
            Sn = U2n * I2n;
        }
        if (!I1n && Sn && U1n) {
            I1n = Sn / U1n;
        }
        if (!I2n && Sn && U2n) {
            I2n = Sn / U2n;
        }
        if (!U1n && Sn && I1n) {
            U1n = Sn / I1n;
        }
        if (!U2n && Sn && I2n) {
            U2n = Sn / I2n;
        }
    if ([I1, I2, U2, P1].every(arr => Array.isArray(arr) && arr.length === I1.length)) {
        rezultate = I1.map((i1, idx) => {
            const i2 = I2[idx], u2 = U2[idx], p1 = P1[idx];
            const p2 = u2 * i2 * fi2;
            const randament = p2 / p1 * 100;
            return {
                index: idx + 1,
                I1: i1,
                I2: i2,
                U2: u2,
                P1: p1,
                randament: randament
            };
        });
    }
}

if (category === "asincr"){
    const get = name => inputArray.find(obj => obj.name === name)?.value || 0;
    const P1 = get("P1"), U1 = get("U1"), I1 = get("I1");
    const n1 = get("n1"), n = get("n"), PGn = get("PGn");
    const IGn = get("IGn"), nGn = get("nGn"), IG = get("IG");
    if ([P1, U1, I1, n, IG].every(arr => Array.isArray(arr) && arr.length === I1.length)) {
        rezultate = I1.map((i1, idx) => {
            const u1 = U1[idx], N = n[idx], iG = IG[idx], p1 = P1[idx];
            const fi1= p1/(3**0.5 * u1 * i1);
            const s = (n1 - N)/n1;
            const k1 = (60*PGn)/(2*Math.PI*nGn*IGn);
            const M = k1 * iG;
            const P2 = M * (2 * Math.PI * N / 60);
            const randament = p2 / p1 * 100;
            return {
                index: idx + 1,
                I1: i1,
                U1: u2,
                n: N,
                IG: iG,
                P1: p1,
                fi1: fi1,
                s: s,
                k1: k1,
                M: M,
                P2: P2,
                randament: randament
            };
        });
    }
}
if (category === "sincr"){
    const get = name => inputArray.find(obj => obj.name === name)?.value || 0;
    const U0 = get("U0"), Ie = get("Ie"), I = get("I"), U = get("U");
    if ([U0, Ie].every(arr => Array.isArray(arr) && arr.length === Ie.length)) {
        rezultate = Ie.map((ie, idx) => {
            const u0 = U0[idx];
            return {
                index: idx + 1,
                U0: u0,
                Ie: ie
            };
        });
    }
     if ([U, I].every(arr => Array.isArray(arr) && arr.length === I.length)){
        rezultate = I.map((i, idx) => {
            const u = U[idx];
            return {
                index: idx + 1,
                U: u,
                I: i
            };
        });
     }
}

    return(
        <>
        {/* aici iti pui inputurile <input value=.../> 
        daca ti se pare prea complicat sa scrii aici inputurile poti sa 
        te ocupi doar de array-ul cu rezultate numerice in partea de deasupra returnului si ma ocup eu sa dau map*/}
        </>
    )
}
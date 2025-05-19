import React, { useEffect } from "react";

export default function({inputArray, category, setData}){

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
            const R1 = R2_prim = Rk / 2;
            const X1 = X2_prim = Xk / 2;
            const R2 = R2_prim * (1/kT)**2;
            const X2 = X2_prim * (1/kT)**2;
            rezultate = { kT, cos_phi10, sin_phi10, Iw, Iu, cos_phi1k, Zk, Rk, Xk, uk, uka, ukr, R1, X1, R2, X2 };

            useEffect(() => {                
                setData([])
            }, [inputArray, category])
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
                    I1: i1,
                    I2: i2,
                    U2: u2,
                    P1: p1,
                    P2: p2,
                    randament: randament
                };
            });
        }

        useEffect(() => {
            if (rezultate && rezultate.length > 0) {
                const x1 = rezultate.map(entry => entry.I2);
                const y1 = rezultate.map(entry => entry.U2);
                const x2 = rezultate.map(entry => entry.I2);
                const y2 = rezultate.map(entry => entry.randament);
                
                setData(
                    [
                    {
                        x: x1,
                        y: y1,
                        xLabel: "I2",
                        yLabel: "U2",
                        color: "blue"
                    },
                    {
                        x: x2,
                        y: y2,
                        xLabel: "I2",
                        yLabel: "randament",
                        color: "orange"
                    }
                ]   
                )
            }
        }, [inputArray, category])
        
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
                const randament = P2 / p1 * 100;
                return {
                    I1: i1,
                    U1: u1,
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


        useEffect(() => {
            if (rezultate && rezultate.length > 0) {
                const x1 = rezultate.map(entry => entry.M);
                const y1 = rezultate.map(entry => entry.n);
                const x2 = rezultate.map(entry => entry.s);
                const y2 = rezultate.map(entry => entry.M);
                const x3 = rezultate.map(entry => entry.P2);
                const y3 = rezultate.map(entry => entry.randament);
                setData(
                   [ 
                    {
                        x: x1,
                        y: y1,
                        xLabel: "M",
                        yLabel: "n",
                        color: "blue"
                    },
                    {
                        x: x2,
                        y: y2,
                        xLabel: "s",
                        yLabel: "M",
                        color: "red",
                    },
                    {
                        x: x3,
                        y: y3,
                        xLabel: "P2",
                        yLabel: "randament",
                        color: "green"
                    }
                    ]
                )
            }
        }, [inputArray, category])

    }
    if (category === "sincr"){
        const get = name => inputArray.find(obj => obj.name === name)?.value || 0;
        const U0 = get("U0"), Ie = get("Ie"), I = get("I"), U = get("U");

        if ([U0, Ie].every(arr => Array.isArray(arr) && arr.length === Ie.length)) {
            rezultate = Ie.map((ie, idx) => {
                const u0 = U0[idx];
                return {
                    U0: u0,
                    Ie: ie
                };
            });
        }

        if ([U, I].every(arr => Array.isArray(arr) && arr.length === I.length)){
            rezultate = [rezultate, I.map((i, idx) => {
                const u = U[idx];
                return {
                    U: u,
                    I: i
                };
            })]
        }

        useEffect(() => {
            if (rezultate && rezultate.length > 0) {
                const x1 = rezultate[0].map(entry => entry.U0);
                const y1 = rezultate[0].map(entry => entry.Ie);
                const x2 = rezultate[1].map(entry => entry.U);
                const y2 = rezultate[1].map(entry => entry.I);
                setData([
                    {
                        x: x1,
                        y: y1,
                        xLabel: "U0",
                        yLabel: "Ie",
                        color: "blue"
                    },
                    {
                        x: x2,
                        y: y2,
                        xLabel: "U",
                        yLabel: "I",
                        color: "red"
                    }
                ])
            }
        }, [inputArray, category])
    }

    rezultate = Array.isArray(rezultate) ? rezultate : [rezultate]

    

    const tableRowArray = Array.isArray(rezultate[0]) ? 
    rezultate.map(table => {
        return [<tr>{Object.keys(table[0]).map(key => <td>{key}</td>)}</tr>, ...table.map(entry => {
            return (
                <tr>
                    {Object.keys(entry).map(key => <td>{parseFloat(entry[key].toFixed(3))}</td>)}
                </tr>
                )
            })
        ]
    })
    : [<tr>{Object.keys(rezultate[0]).map(key => <td>{key}</td>)}</tr>
        , ...rezultate.map(entry => {
            return (
            <tr>
                {Object.keys(entry).map(key => <td>{parseFloat(entry[key].toFixed(3))}</td>)}
            </tr>
            )
    })
    ]

    return(
        <div className="table-container">
            {
                Array.isArray(rezultate[0]) ?
                    <div>
                        <table className="tabel-rezultate" border={2}>
                            <tbody>
                                {...tableRowArray[0]}
                            </tbody>
                        </table>
                        <table className="tabel-rezultate" border={2}>
                            <tbody>
                                {...tableRowArray[1]}
                            </tbody>
                        </table>
                    </div>
                :
                <table className="tabel-rezultate" border={2}>
                    <tbody>
                        {...tableRowArray}
                    </tbody>
                </table>
            }
            
        </div>
    )
}
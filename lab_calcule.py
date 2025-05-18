from flask import Flask, request, jsonify
app = Flask(__name__)

@app.route("/calculate", methods=["POST"])
def calculate():
    data = request.json
    lab_type = data.get("lab")
    inputs = data.get("inputs")

    result = {}

    if lab_type == "trgol":
        # Example: calcul pierderi in gol
        try:
            Sn= float(inputs.get("Sn", 0))
            U1n = float(inputs.get("U1n", 0))
            U2n = float(inputs.get("U2n", 0))
            I1n = float(inputs.get("I1n", 0))
            I2n = float(inputs.get("I2n", 0))
            if Sn == 0 and U1n != 0 and I1n != 0 and U2n != 0 or I2n != 0:
                Sn = U1n * I1n
            elif Sn == 0 and U2n != 0 and I2n != 0 and U1n != 0 or I1n != 0:
                Sn = U2n * I2n
            elif Sn != 0 and U1n != 0 and U2n != 0 and I1n == 0 and I2n == 0:
                I1n = Sn / U1n
                I2n = Sn / U2n   
            elif Sn == 0 and I1n != 0 and I2n != 0 and U1n == 0 and U2n == 0:
                U1n = Sn / I1n
                U2n = Sn / I2n
            U10 = float(inputs.get("U10", 0))
            I10 = float(inputs.get("I10", 0))
            P10 = float(inputs.get("P10", 0))
            U20 = float(inputs.get("U20", 0))
            U1k = float(inputs.get("U1k", 0))
            I1k = float(inputs.get("I1k", 0))
            P1k = float(inputs.get("P1k", 0))
            I2k = float(inputs.get("I2k", 0))
            if any(x == 0 for x in [U10, I10, P10, U20, U1k, I1k, P1k, I2k]):
                result["error"] = "Valorile U10, I10, P10, U20, U1k, I1k, P1k, I2k trebuie completate și diferite de zero"
                return jsonify(result)
            kT = U10/U20
            cos_phi10 = P10/(U10*I10)
            sin_phi10 = (1-cos_phi10**2)**0.5
            Iw = I10*cos_phi10
            Iμ = I10*sin_phi10
            cos_phi1k = P1k/(U1k*I1k)
            Zk = U1k/I1k
            Rk = P1k/(I1k**2)
            Xk = (Zk**2 - Rk**2)**0.5
            uk = U1k/U1n * 100
            uka = (Rk*I1n)/U1n * 100
            ukr = (Xk*I1n)/U1n * 100
            R1 = R2_prim = Rk/2
            X1 = X2_prim = Xk/2
            R2 = R2_prim * (1/kT)**2
            X2 = X2_prim * (1/kT)**2
            #Returnam rezultatul
            result.update({
                "kT": kT, "cos_phi10": cos_phi10, "sin_phi10": sin_phi10,
                "Iw": Iw, "Iμ": Iμ, "cos_phi1k": cos_phi1k, "Zk": Zk, "Rk": Rk, "Xk": Xk,
                "uk": uk, "uka": uka, "ukr": ukr, "R1": R1, "R2_prim": R2_prim, "X1": X1,
                "X2_prim": X2_prim, "R2": R2, "X2": X2
            })  
        except:
            result["error"] = "Valori invalide pentru trgol"
    
    elif lab_type == "monofaz":
        try:
            Sn= float(inputs.get("Sn", 0))
            U1n = float(inputs.get("U1n", 0))
            U2n = float(inputs.get("U2n", 0))
            I1n = float(inputs.get("I1n", 0))
            I2n = float(inputs.get("I2n", 0))
            if Sn == 0 and U1n != 0 and I1n != 0 and U2n != 0 or I2n != 0:
                Sn = U1n * I1n
            elif Sn == 0 and U2n != 0 and I2n != 0 and U1n != 0 or I1n != 0:
                Sn = U2n * I2n
            elif Sn != 0 and U1n != 0 and U2n != 0 and I1n == 0 and I2n == 0:
                I1n = Sn / U1n
                I2n = Sn / U2n   
            elif Sn == 0 and I1n != 0 and I2n != 0 and U1n == 0 and U2n == 0:
                U1n = Sn / I1n
                U2n = Sn / I2n
            #if any(x == 0 for x in [U10, I10, P10, U20, U1k, I1k, P1k, I2k]):
               # result["error"] = "Valorile U10, I10, P10, U20, U1k, I1k, P1k, I2k trebuie completate și diferite de zero"
                #return jsonify(result)
        except:
            result["error"] = "Valori invalide pentru monofaz"

    elif lab_type == "asincr":
        try:
            P1 = float(inputs.get("P1", 0))
            result["P1_dublat"] = 2 * P1
        except:
            result["error"] = "Valori invalide pentru asincr"

    elif lab_type == "sincr":
        try:
            U = float(inputs.get("U", 0))
            I = float(inputs.get("I", 0))
            cos_phi = float(inputs.get("cos ϕ", 1))
            result["P"] = 3 * U * I * cos_phi  # Simplified power calculation
        except:
            result["error"] = "Valori invalide pentru sincr"

    else:
        result["error"] = "Tip laborator necunoscut"

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)

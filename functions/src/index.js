"use strict";
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable object-curly-spacing */
/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateScore = void 0;
// import { onRequest } from "firebase-functions/v2/https";
var firestore_1 = require("firebase-functions/v2/firestore");
var logger = require("firebase-functions/logger");
var wrValues = {
    DLFT: 939,
    BKSQ: 800,
    WTPU: 500,
    BNCH: 600,
    SQTS: 150,
    PSHU: 150,
    PLUP: 49,
    STLJ: 147,
    PSHP: 495,
    PWCL: 400,
    PSPR: 9.58,
    PIKE: 0,
    BKBN: 0,
    STRD: 0,
    TWOMDST: 0.5,
    ONEHRDST: 13.25,
    STAPN: 11.5,
    AGLTY: 13,
    BLNC: 10,
    COORD: 47,
};
var WR = new Map(Object.entries(wrValues));
/**
 * Looks up the user's body weight
 * @param {string} uid unique user id
 * @return {Promise} with user's bodyweight
 */
function getBodyWeight(uid) {
    return __awaiter(this, void 0, void 0, function () {
        var weight;
        return __generator(this, function (_a) {
            weight = 172;
            logger.info("lookup weight for", uid);
            return [2 /*return*/, Promise.resolve(weight)];
        });
    });
}
exports.calculateScore = (0, firestore_1.onDocumentCreated)("user/{uid}/score/{sid}", function (event) {
    logger.info("user score documentCreated event", event);
    var snapshot = event.data;
    if (!snapshot) {
        logger.info("no data associated with event");
        return null;
    }
    var data = snapshot.data();
    if (data.calculatedScore) {
        logger.info("calculatedScore already set");
        return null;
    }
    logger.info("data", data);
    return calcScore(data).then(function (score) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    logger.info("calcScore", score);
                    return [4 /*yield*/, snapshot.ref.set({
                            calculatedScore: score,
                        }, { merge: true })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
/**
 * Calculate the assessement score
 * @param {Score} req request parameter with the new score
 * @return {Promise} returns propmis containing the calculated score
 */
function calcScore(req) {
    return __awaiter(this, void 0, void 0, function () {
        var wr, result, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    wr = WR.get(req.aid) || 0;
                    result = req.rawScore;
                    _a = req.aid;
                    switch (_a) {
                        case "DLFT": return [3 /*break*/, 1];
                        case "BKSQ": return [3 /*break*/, 1];
                        case "BNCH": return [3 /*break*/, 1];
                        case "SQTS": return [3 /*break*/, 1];
                        case "PSHU": return [3 /*break*/, 1];
                        case "PLUP": return [3 /*break*/, 1];
                        case "STLJ": return [3 /*break*/, 1];
                        case "PSHP": return [3 /*break*/, 1];
                        case "PWCL": return [3 /*break*/, 1];
                        case "STAPN": return [3 /*break*/, 1];
                        case "WTPU": return [3 /*break*/, 2];
                        case "PIKE": return [3 /*break*/, 4];
                        case "BKBN": return [3 /*break*/, 4];
                        case "STRD": return [3 /*break*/, 4];
                        case "BLNC": return [3 /*break*/, 4];
                        case "COORD": return [3 /*break*/, 4];
                        case "PSPR": return [3 /*break*/, 5];
                        case "TWOMDST": return [3 /*break*/, 6];
                        case "ONEHRDST": return [3 /*break*/, 7];
                        case "AGLTY": return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 9];
                case 1:
                    // result = Math.round((req.rawScore / wr) * 100000) / 100;
                    result = Math.round((req.rawScore / wr) * 1000);
                    return [3 /*break*/, 10];
                case 2: // Weighted Pull-up
                return [4 /*yield*/, getBodyWeight(req.uid).then(function (bodyWeight) {
                        logger.info("rawScore " + req.rawScore.toString());
                        logger.info("got body weight: " + bodyWeight.toString());
                        logger.info("world record " + wr.toString());
                        result = ((req.rawScore + Number(bodyWeight)) / wr) * 1000;
                        logger.info("set result " + result.toString());
                    })];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 10];
                case 4:
                    result = req.rawScore * 100;
                    return [3 /*break*/, 10];
                case 5:
                    // result = Math.round((Math.sqrt((req.rawScore - wr) / 0.125) * -1 + 10) * 10000) / 100;
                    result = Math.round((Math.sqrt((req.rawScore - wr) / 0.125) * -1 + 10) * 100);
                    return [3 /*break*/, 10];
                case 6:
                    // result = Math.round((Math.sqrt((wr - req.rawScore) / 0.005) * -1 + 10) * 10000) / 100;
                    result = Math.round((Math.sqrt((wr - req.rawScore) / 0.005) * -1 + 10) * 100);
                    return [3 /*break*/, 10];
                case 7:
                    // result = Math.round((Math.sqrt((wr - req.rawScore) / 0.1325) * -1 + 10) * 10000) / 100;
                    if (req.rawScore < 5.0) {
                        result = Math.round((Math.sqrt((wr - req.rawScore) / 0.1325) * -1 + 10) * 100);
                    }
                    else {
                        result = Math.round((req.rawScore / 13.25) * 1000);
                    }
                    return [3 /*break*/, 10];
                case 8:
                    // result = Math.round((Math.sqrt((req.rawScore - wr) / 0.25) * -1 + 10) * 10000) / 100;
                    result = Math.round((Math.sqrt((req.rawScore - wr) / 0.25) * -1 + 10) * 100);
                    return [3 /*break*/, 10];
                case 9: 
                // if falls through jusr return raw score
                return [3 /*break*/, 10];
                case 10: return [2 /*return*/, Promise.resolve(result)];
            }
        });
    });
}

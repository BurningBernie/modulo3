'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:

function $Promise(executor) {
    if (typeof executor !== 'function') throw new TypeError('executor function')

    this._state = 'pending'
    this._value
    this._handlerGroups = []

    executor(this._internalResolve.bind(this), (value) => this._internalReject(value))
    //dos formas de hacer lo mismo
}

$Promise.prototype._internalResolve = function (data) {
    if (this._state === 'pending') {
        this._state = 'fulfilled'
        this._value = data
        this._callHandlers()
    }
}

$Promise.prototype._internalReject = function (reason) {
    if (this._state === 'pending') {
        this._state = 'rejected'
        this._value = reason
        this._callHandlers()
    }
}

$Promise.prototype._callHandlers = function () {
    while (this._handlerGroups[0]) { //this._handlerGroups.length
        const hd = this._handlerGroups.shift()
        //-------------camino del éxito-------------------------------------------------
        if (this._state === 'fulfilled') {
            if (hd.successCb) {
                try {
                    const result = hd.successCb(this._value)
                    if (result instanceof $Promise) {
                        // Handler devulve una promesa 
                        return result.then(
                            value => hd.downstreamPromise._internalResolve(value),
                            error => hd.downstreamPromise._internalReject(error)
                        )
                    } else {
                        // Handler devolvió un valor
                        hd.downstreamPromise._internalResolve(result)
                    }
                }
                catch (error) {
                    //Handler arrojó un error o excepción
                    hd.downstreamPromise._internalReject(error)
                }
            } else {
                hd.downstreamPromise._internalResolve(this._value)
            }
            //-------------camino del error-----------------------------------------------------
        } else if (this._state === 'rejected') {
            if (hd.errorCb) {
                try {
                    const result = hd.errorCb(this._value)
                    if (result instanceof $Promise) {
                        // Handler devulve una promesa 
                        return result.then(
                            value => hd.downstreamPromise._internalResolve(value),
                            reason => hd.downstreamPromise._internalReject(reason)
                        )
                    } else {
                        // Handler devolvió un valor
                        hd.downstreamPromise._internalResolve(result)
                    }
                }
                catch (error) {
                    //Handler arrojó un error o excepción
                    hd.downstreamPromise._internalReject(error)
                }
            } else {
                hd.downstreamPromise._internalReject(this._value)
            }
        }
    }
}

$Promise.prototype.then = function (goodResult, badResult) {
    if (typeof badResult !== 'function') badResult = false
    if (typeof goodResult !== 'function') goodResult = false

    const downstreamPromise = new $Promise(() => { })

    this._handlerGroups.push({
        successCb: goodResult,
        errorCb: badResult,
        downstreamPromise
    })

    if (this._state !== 'pending') this._callHandlers()
    return downstreamPromise
}

$Promise.prototype.catch = function (error) {
    return this.then(null, error)
}

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/


/*
$Promise.prototype.then = function (goodResult, badResult) {
    if (typeof goodResult === 'function' && typeof badResult === 'function') {
    this._handlerGroups.push({
        successCb:goodResult,
        errorCb:badResult
    })
}else{
    if (typeof goodResult === 'function' && typeof badResult !== 'function') {
        this._handlerGroups.push({
            successCb:goodResult,
            errorCb:false
        })
    }
    if(typeof goodResult !== 'function' && typeof badResult === 'function') {
        this._handlerGroups.push({
            successCb:false,
            errorCb:badResult
        })
    }
    if(typeof goodResult !== 'function' && typeof badResult !== 'function') {
        this._handlerGroups.push({
            successCb:false,
            errorCb:false
        })
    }
}

}
*/
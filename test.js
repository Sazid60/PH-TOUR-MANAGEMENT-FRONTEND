// const myPromise = new Promise((resolve, reject) => resolve())
// .then(() => console.log("Resolved"))
// .catch(() => console.log("Rejected"))

let savedResolve, saveReject;

const myPromise = new Promise((resolve, reject) => {
    savedResolve = resolve;
    saveReject = reject;
})

savedResolve("Ami Resolve Hoye gesi!") // can be called from anywhere

myPromise
    .then((value) => console.log("Promise Resolved :", value))
    .catch((err) => console.log("Promise Rejected :", err))

savedResolve("Ami Resolve Hoye gesi!") // can be called from anywhere
saveReject("Kuno Akta Error Hoye gese!")

setTimeout(()=>{
    savedResolve("Hehe etai Bastob");
}, 3000)
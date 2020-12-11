function lasa(event) {
    event.preventDefault();
console.log(document.getElementById('myid').value);
console.log(document.getElementById('myid2').value);
console.log(document.getElementById('myid3').value);
console.log(document.getElementById('myid4').value);
console.log('entered lasa()');

axios.post('http://localhost:8080/api/user/create', {
    name: document.getElementById('myid').value,
    email: document.getElementById('myid2').value,
    password: document.getElementById('myid3').value
  }).then(function (response) {
    console.log('post called client');
  console.log(response);
}).catch(function (error) {
    console.log(error);
    console.log('error or server returned error');
  });
}
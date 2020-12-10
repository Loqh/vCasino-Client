function lasa(event) {
    event.preventDefault();
console.log(document.getElementById('myid').value);
console.log('entered lasa()');

axios.post('http://localhost:8080/api/user/create', {
    name: document.getElementById('myid').value
  }).then(function (response) {
    console.log('post called client');
  console.log(response);
}).catch(function (error) {
    console.log(error);
    console.log('error or server returned error');
  });
}
document.addEventListener('DOMContentLoaded', () => {
  app();
})

async function app() {
  const dogs = await fetch('http://localhost:3000/dogs').then(res => res.json());
  let selectedDog = null;

  const dogForm = document.querySelector('#dog-form');
  const dogTable = document.querySelector('table #table-body');
  dogs.forEach(dog => dogTable.appendChild(renderDogRow(dog)));

  dogForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedDog) return;
    const { name, breed, sex } = e.target;
    selectedDog.name = name.value;
    selectedDog.breed = breed.value;
    selectedDog.sex = sex.value;

    fetch(`http://localhost:3000/dogs/${selectedDog.id}`, {
      method: 'PUT',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(selectedDog)
    }).then((res) => {
      if (!res.ok) throw new Error(`Invalid Response From Server: ${res.status}`);
      const oldRow = document.querySelector(`#dog-${selectedDog.id}`);
      oldRow.replaceWith(renderDogRow(selectedDog));
      selectedDog = null;
      e.target.reset();
    })


  })


  function renderDogRow(dog) {
    const { id, name, breed, sex } = dog;
    const dogRow = document.createElement('tr');
    dogRow.id = `dog-${id}`;

    const dogName = document.createElement('td');
    dogName.innerText = name;

    const dogBreed = document.createElement('td');
    dogBreed.innerText = breed;

    const dogSex = document.createElement('td');
    dogSex.innerText = sex;

    const editButtonHolder = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', e => {
      selectedDog = dog;
      dogForm.name.value = name;
      dogForm.breed.value = breed;
      dogForm.sex.value = sex;
    })

    editButtonHolder.appendChild(editButton);
    dogRow.append(dogName, dogBreed, dogSex, editButtonHolder);

    return dogRow;
  }

  function updateDogRow(dog) {

  }

}
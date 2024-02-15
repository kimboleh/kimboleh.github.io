// animated skills list carousel!

function switchList(event) {
    const list1 = document.getElementById('list-1');
    const list2 = document.getElementById('list-2');

    if (list1.classList.contains('active-list')) {
        list1.classList.remove('active-list');
        list1.classList.add('inactive-list');
        list2.classList.remove('inactive-list');
        list2.classList.add('active-list');
    } else {
        list2.classList.remove('active-list');
        list2.classList.add('inactive-list');
        list1.classList.remove('inactive-list');
        list1.classList.add('active-list');
    }
}

// document.addEventListener('click', switchList, false);
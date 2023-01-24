async function DeleteEventUser(id) {
     fetch(`https://localhost:7100/api/EventUser/${id}`, {
            method: 'DELETE',
          })
            // .then(() => (element.innerHTML = 'Delete successful'))
            .catch((err) =>
              console.log(
                `Failed Deleting of EventUser ${id}: `,
                err
              )
            );
}
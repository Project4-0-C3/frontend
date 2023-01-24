async function PostEventUser(id, eventId) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventUserId: 0,
          eventId: eventId,
          userId: id,
        }),
      };
      // console.log(requestOptions);
       fetch('https://localhost:7100/api/EventUser', requestOptions)
        .then((response) => response.json())
        .catch((err) =>
          console.log(`Failed Posting of EventUser ${c}: `, err)
        );
}
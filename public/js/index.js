/**
 * upload the tar file
 */
var uploadTar = function () {
    var input = document.getElementById('tar_upload');

    var data = new FormData();
    data.append('tar', input.files[0]);

    fetch('file/setFiles', {
        method: 'POST',
        body: data
    })
        .then(data => data.json())
        .then((res) => {
            if (res.success) {
                alert(res.message.desc);
            } else {
                alert(res.message.desc);
            }
        }).catch((err) => {
            alert(err);
        });
};
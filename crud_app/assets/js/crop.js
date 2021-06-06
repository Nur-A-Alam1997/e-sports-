

let result = document.querySelector('.result'),
img_result = document.querySelector('.img-result'),
img_w = document.querySelector('.img-w'),
img_h = document.querySelector('.img-h'),
options = document.querySelector('.options'),
save = document.querySelector('.save'),
cropped = document.querySelector('.cropped'),
dwn = document.querySelector('.download'),
upload = document.querySelector('#file-input'),
cropper = '';

// on change show image with crop options
upload.addEventListener('change', (e) => {
    if (e.target.files.length) {
        // start file reader
        const reader = new FileReader();
        reader.onload = (e)=> {
            if(e.target.result){
                // create new image
                let img = document.createElement('img');
                img.id = 'image';
                img.src = e.target.result
                // clean result before
                result.innerHTML = '';
                // append new image
                result.appendChild(img);
                // show save btn and options
                save.classList.remove('hide');
                options.classList.remove('hide');
                // init cropper
                cropper = new Cropper(img);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
    }
});


// save on click
save.addEventListener('click',(e)=>{
    e.preventDefault();
    // get result to data uri
    let imgSrc = cropper.getCroppedCanvas({
        width: img_w.value // input value
    }).toDataURL();

    // console.log(imgSrc)
    // var objectData =
    //      {
    //         //  Username: document.getElementById('userid').value,
    //         //  Password: document.getElementById('password').value                
    //         Image:imgSrc
    //      };

    // var objectDataString = JSON.stringify(objectData);
    // console.log(objectDataString)

    $.ajax({
                type: "POST",
                url: "/crop",
                // dataType: "json",
                data: {
                    "img":imgSrc
                },
                success: function (data) {
                alert('Success');

                },
                error: function () {
                alert('Error');
                }
            });


    // console.log(imgSrc)
    // remove hide class of img
    cropped.classList.remove('hide');
    img_result.classList.remove('hide');
    // show image cropped
    cropped.src = imgSrc;
    dwn.classList.remove('hide');
    dwn.download = 'imagename.png';
    dwn.setAttribute('href',imgSrc);
});



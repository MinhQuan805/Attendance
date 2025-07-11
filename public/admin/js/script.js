const selectDate = document.querySelector("[select-date]");
if (selectDate) {
    let url = new URL(window.location.href);
    selectDate.addEventListener("change", function() {
        const changeDate = document.querySelector("#changeDate");
        const datevalue = selectDate.value;
        if (datevalue) {
            url.searchParams.set("date", datevalue);
        }
        else {
            url.searchParams.delete("date");
        }
        window.location.href = url.href;
    });
}

const selectCourse = document.querySelector("[select-course]");
if (selectCourse) {
    let url = new URL(window.location.href);
    selectCourse.addEventListener("change", (e) => {
        const value = e.target.value;
        if (value) {
            url.searchParams.set("course_id", value);
        }
        window.location.href = url.href;
    });
}
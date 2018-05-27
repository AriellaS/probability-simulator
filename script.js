let reset = () => {
    $("#error").text("");
    $(".results").css("display", "none");
    $(".result").remove();
}

function calculate() {
    return new Promise((resolve, reject) => {
        let probabilities = [];
        let sum = 0;
        let multiplier = 1;

        $(".y").each(function(i) {
            let y = $(this).val();
            if (y.length > 0) {
                y = Number.parseFloat(y);
                if (!(isNaN(y) || y < 0)) {
                    sum += y;
                    probabilities[i] = y;
                    y *= multiplier;
                    while (!(Math.floor(y) === y)) {
                        multiplier *= 10
                        y *= multiplier;
                    }
                } else {
                    reject("Make sure your P(x) values are positive numbers.");
                }
            }
        });

        if (sum != 1) {
            reject("Make sure your P(x) values add up to 1");
        }

        probabilities = probabilities.map(p => p * multiplier);

        let bag = [];
        let sample = {};
        $(".x").each(function(i) {
            let x = $(this).val();
            if (x.length > 0) {
                x = Number.parseFloat(x);
                if (!isNaN(x)) {
                    sample[x] = 0;
                    for (let j = 0; j < probabilities[i]; j++) {
                        bag.push(x);
                    }
                } else {
                    reject("Make sure your x values are numbers");
                }
            }
        });

        let mean = 0;
        let sampleSize = Number.parseInt($("#sample").val());
        if (isNaN(sampleSize) || sampleSize < 0) {
            reject("Make sure your sample size is a positive integer")
        }
        for (let i = 0; i < sampleSize; i++) {
            let chosen = bag[Math.floor(Math.random() * multiplier)];
            mean += chosen;
            sample[chosen]++;
        }
        mean /= sampleSize;

        $.each(sample, function(x, freq) {
            $("#frequencies").append(
                `<tr class="result">
                    <td>${x}</td>
                    <td>${freq}</td>
                </tr>`
            );
        });
        $("#mean").text(mean);

        resolve();
    });
};

$(function() {

    $(document).on("input", "#last", function() {
        $("#last").attr("id", "");
        $("#values").append(
            `<tr>
				<td>
					<input type="text" class="x" id="last" />
				</td>
				<td>
					<input type="text" class="y" />
				</td>
            </tr>`
        );
    });

    $(document).on("click", "#btn", function() {

        reset();

        calculate().then(
            () => $(".results").css("display", "block"),
            (message) => $("#error").text(message)
        );

    });

});

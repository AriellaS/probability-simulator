let error = (message) => {
    $("#error").text(message);
}

let displayMean = (mean) => {
    $("#mean").text(mean);
}

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

    $(document).on("click", "#btn", function()  {

        error("");
        $(".results").css("display:none;");

        let probabilities = [];
        let sum = 0;
        let multiplier = 1;

        $(".y").each(function(i) {
            let y = Number.parseFloat($(this).val());
            if (!isNaN(y)) {
                sum += y;
                probabilities[i] = y;
                y *= multiplier;
                while (!(Math.floor(y) === y)) {
                    multiplier *= 10
                    y *= multiplier;
                }
            } else {
                // error("Make sure your P(x) values are positive numbers.");
            }
        });

        if (sum != 1) {
            error("Make sure your P(x) values add up to 1");
        }

        probabilities = probabilities.map(p => p * multiplier);

        let bag = [];
        let sample = {};
        $(".x").each(function(i) {
            let x = Number.parseInt($(this).val());
            if (!isNaN(x)) {
                sample[x] = 0;
                for (let j = 0; j < probabilities[i]; j++) {
                    bag.push(x);
                }
            } else {
                // error("Make sure your x values are numbers");
            }
        });

        let mean = 0;
        let sampleSize = Number.parseInt($("#sample").val());
        for (let i = 0; i < sampleSize; i++) {
            let chosen = bag[Math.floor(Math.random() * multiplier)];
            mean += chosen;
            sample[chosen]++;
        }
        mean /= sampleSize;

        $.each(sample, function(x, freq) {
            $("#frequencies").append(
                `<tr>
                    <td>${x}</td>
                    <td>${freq}</td>
                </tr>`
            );
        });
        displayMean(mean)

        $(".results").css("display" , "block");

    });

});

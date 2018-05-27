$(function() {

    $(document).on("input", "#last", function() {
        $("#last").attr("id", "");
        $(".tbl").append(
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

        $("#error").remove();

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
            }
        });

        if (sum != 1) {
            $(".container").append(
                `<p style="color:red" id="error">Make sure your P(x) values add up to 1</p>`
            )
            return;
        }

        probabilities = probabilities.map(p => p * multiplier);

        let bag = [];
        $(".x").each(function(i) {
            let x = $(this).val();
            if (x.length > 0) {
                for (let j = 0; j < probabilities[i]; j++) {
                    bag.push(x);
                }
            }
        });

        let sample = [];
        let sampleSize = Number.parseInt($("#sample").val());
        for (let i = 0; i < sampleSize; i++) {
            sample.push(bag[Math.floor(Math.random() * (multiplier))]);
        }
        console.log(sample);

    });

});

import * as fs from 'fs';
import * as path from 'path';

// 🔹 Directory containing JSON files
const directoryPath = '../data/subjects';

// 🔹 Condition function (Modify as needed)
function filterCondition(data: any): boolean {
    return data.type === "kanji";
}

// 🔹 Read all JSON files and apply the filter
function processJsonFiles(dir: string) {
    try {
        const files = fs.readdirSync(dir);
        const jsonFiles = files.filter(file => file.endsWith('.json'));

        console.log(`Found ${jsonFiles.length} JSON files. Processing...`);

        jsonFiles.forEach(file => {
            const filePath = path.join(dir, file);
            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const kanji = JSON.parse(content);

                if (filterCondition(kanji)) {
                        console.log(`✅ Processing: ${file}`);
                    const radicals = kanji.related.radicals;
                    const radicalNames:Array<String> = [];
                    radicals.forEach((radical: String) => {
                        const radicalFile = fs.readFileSync(`../data/subjects/${radical}.json`, 'utf8');
                        const radicalJson = JSON.parse(radicalFile);
                        radicalNames.push(radicalJson.primaryMeaning);
                    });
                    kanji["radicalNames"] = radicalNames;

                    fs.writeFileSync(`../data/kanji/${kanji.id}.json`, JSON.stringify(kanji, null, 2));
                }

            } catch (error) {
                console.error(`❌ Error reading ${file}:`, error.message);
            }
        });
    } catch (err) {
        console.error("Error reading directory:", err.message);
    }
}

// 🔹 Run the function
processJsonFiles(directoryPath);

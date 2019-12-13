
Pod::Spec.new do |s|
  s.name         = "RNChartboost"
  s.version      = "0.0.14"
  s.summary      = "RNChartboost"
  s.description  = <<-DESC
                  Display native Chartboost ads and get rich in the process.
                   DESC
  s.homepage     = "https://github.com/author/RNChartboost.git"
  s.license      = "MIT"
  s.author             = { "Kjell Connelly" => "kjellapps@gmail.com" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNChartboost.git", :tag => "v#{s.version}" }
  s.source_files  = "RNChartboost/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end
